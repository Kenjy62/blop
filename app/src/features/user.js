"use server";

// Required
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { fetch } from "../config/text";
import { writeFile } from "fs/promises";

// Prisma
import { PrismaClient } from "@prisma/client";

// Register User
export async function Register(formData) {
  const prisma = new PrismaClient();

  return prisma.user
    .findFirst({
      where: {
        OR: [{ name: formData.get("name") }, { email: formData.get("email") }],
      },
    })
    .then(async (data) => {
      if (data !== null) {
        return {
          message: fetch.user.register.error.alreadyExist.message,
          status: fetch.user.register.error.alreadyExist.status,
        };
      } else {
        const avatar = formData.get("avatar");
        const cover = formData.get("cover");

        if (avatar.size === 0 || cover.size === 0) {
          return prisma.user
            .create({
              data: {
                name: formData.get("name"),
                email: formData.get("email"),
                password: formData.get("password"),
                picture: "/Avatars/Default.png",
                cover: "/Covers/Default.png",
              },
            })
            .then(async () => {
              return {
                message: fetch.user.register.success.message,
                status: fetch.user.register.success.status,
              };
            })
            .catch((error) => {
              console.log(error);
              return {
                message: fetch.user.register.error.message,
                status: fetch.user.register.error.status,
              };
            });
        }

        if (avatar.size > 0 || cover.size > 0) {
          const avatarBytes = await avatar.arrayBuffer();
          const avatarBuffer = Buffer.from(avatarBytes);

          const coverBytes = await cover.arrayBuffer();
          const coverBuffer = Buffer.from(coverBytes);

          await writeFile(
            `public/Covers/${formData.get("name")}_${cover.name}`,
            coverBuffer
          );

          await writeFile(
            `public/Avatars/${formData.get("name")}_${avatar.name}`,
            avatarBuffer
          );

          return prisma.user
            .create({
              data: {
                name: formData.get("name"),
                email: formData.get("email"),
                password: formData.get("password"),
                picture: `/Avatars/${formData.get("name")}_${avatar.name}`,
                cover: `/Covers/${formData.get("name")}_${cover.name}`,
              },
            })
            .then(() => {
              return {
                message: fetch.user.register.success.message,
                status: fetch.user.register.success.status,
              };
            })
            .catch((error) => {
              console.log(error);
              return {
                message: fetch.user.register.error.message,
                status: fetch.user.register.error.status,
              };
            });
        }
      }
    })
    .catch((error) => {
      console.log(error);
      return {
        message: fetch.user.register.error.message,
        status: fetch.user.register.error.status,
      };
    })
    .finally(() => {
      prisma.$disconnect();
    });
}

// Login User
export async function Login(formData) {
  const prisma = new PrismaClient();

  return prisma.user
    .findFirst({
      where: {
        email: formData.get("email"),
        password: formData.get("password"),
      },
      select: {
        id: true,
        name: true,
        picture: true,
      },
    })
    .then(async (data) => {
      const token = jwt.sign({ token: data.id }, "randomKey");
      return prisma.user
        .update({
          where: {
            id: data.id,
          },
          data: {
            token: token,
          },
        })
        .then(() => {
          cookies().set("token", token);
          return {
            data: token,
            message: fetch.user.login.success.message,
            status: fetch.user.login.success.status,
          };
        });
    })
    .catch((error) => {
      console.log(error);
      return {
        message: fetch.user.login.error.message,
        status: fetch.user.login.error.statut,
      };
    })
    .catch((error) => {
      console.log(error);
      return {
        message: fetch.user.login.error.message,
        status: fetch.user.login.error.statut,
      };
    })
    .finally(() => {
      prisma.$disconnect();
    });
}

// Logout User
export async function Logout() {
  cookies().delete("token");
}

// Verify if user is logged

export async function isLogged() {
  const isLogged = cookies().get("token")?.value;

  if (isLogged) {
    return true;
  } else {
    return false;
  }
}

// Base Initialization User
export const init = async () => {
  const token = cookies().get("token")?.value;
  const prisma = new PrismaClient();

  return prisma.user
    .findFirst({
      where: {
        token: token,
      },
      select: {
        id: true,
        name: true,
        picture: true,
        email: true,
        token: true,
        darkMode: true,
        display_follow: true,
        display_follower: true,
        notification: true,
        colorScheme: true,
        followedFeedView: true,
      },
    })
    .then(async (data) => {
      return {
        data: data,
        message: fetch.user.init.success.message,
        status: fetch.user.init.success.status,
      };
    })
    .catch((error) => {
      console.log(error);
      return {
        message: fetch.user.init.error.message,
        status: fetch.user.init.error.status,
      };
    })
    .finally(() => {
      prisma.$disconnect();
    });
};

// Update User Avatar
export const UpdateAvatar = async (filename) => {
  const prisma = new PrismaClient();

  return init()
    .then(async ({ data }) => {
      return prisma.user
        .update({
          where: {
            id: data.id,
          },
          data: {
            picture: filename,
          },
        })
        .then(() => {
          return {
            message: fetch.user.profil.update.success.message,
            status: fetch.user.profil.update.success.status,
          };
        })
        .catch((error) => {
          console.log(error);
          return {
            message: fetch.user.profil.update.error.message,
            status: fetch.user.profil.update.error.status,
          };
        });
    })
    .catch((error) => {
      console.log(error);
      return {
        message: fetch.user.init.error.message,
        status: fetch.user.init.error.status,
      };
    })
    .finally(() => {
      prisma.$disconnect();
    });
};

// Update User Cover
export const UpdateCover = async (filename) => {
  const prisma = new PrismaClient();

  return init()
    .then(async ({ data }) => {
      return prisma.user
        .update({
          where: {
            id: parseInt(data.id),
          },
          data: {
            cover: filename,
          },
        })
        .then(() => {
          return {
            message: fetch.user.profil.update.success.message,
            status: fetch.user.profil.update.success.status,
          };
        })
        .catch((error) => {
          console.log(error);
          return {
            message: fetch.user.profil.update.error.message,
            status: fetch.user.profil.update.error.status,
          };
        });
    })
    .catch((error) => {
      console.log(error);
      return {
        message: fetch.user.get.error.message,
        status: fetch.user.get.error.status,
      };
    })
    .finally(() => {
      prisma.$disconnect();
    });
};

// Get User Notifications Settings
export const getNotificationsSettings = async () => {
  const prisma = new PrismaClient();

  return init()
    .then(async ({ data }) => {
      return prisma.user
        .findFirst({
          where: {
            id: data.id,
          },
          select: {
            like_notification: true,
            message_notification: true,
            comment_notification: true,
          },
        })
        .then((response) => {
          return {
            data: response,
            message: fetch.user.get.success.message,
            status: fetch.user.get.success.status,
          };
        })
        .catch((error) => {
          console.log(error);
          return {
            message: fetch.user.get.error.message,
            status: fetch.user.get.error.status,
          };
        });
    })
    .catch((error) => {
      console.log(error);
      return {
        message: fetch.user.init.error.message,
        status: fetch.user.init.error.status,
      };
    })
    .finally(() => {
      prisma.$disconnect();
    });
};

// Get User Notifications Settings
export const getConfidentialitySettings = async () => {
  const prisma = new PrismaClient();

  return init()
    .then(async ({ data }) => {
      return prisma.user
        .findFirst({
          where: {
            id: data.id,
          },
          select: {
            display_follow: true,
            display_follower: true,
          },
        })
        .then(async (data) => {
          return {
            data: data,
            message: fetch.user.get.success.message,
            status: fetch.user.get.success.status,
          };
        })
        .catch((error) => {
          console.log(error);
          return {
            message: fetch.user.get.error.message,
            status: fetch.user.get.error.status,
          };
        });
    })
    .catch((error) => {
      console.log(error);
      return {
        message: fetch.user.init.error.message,
        status: fetch.user.init.error.status,
      };
    })
    .finally(() => {
      prisma.$disconnect();
    });
};

export const getUserConfidentialitySettings = async (name) => {
  const prisma = new PrismaClient();

  return prisma.user
    .findFirst({
      where: {
        name: name,
      },
      select: {
        display_follow: true,
        display_follower: true,
      },
    })
    .then((data) => {
      return {
        data: data,
        message: fetch.user.get.success.message,
        status: fetch.user.get.success.status,
      };
    })
    .catch((error) => {
      console.log(error);
      return {
        message: fetch.user.get.error.message,
        status: fetch.user.get.error.status,
      };
    })
    .finally(() => {
      prisma.$disconnect();
    });
};

// Update User Notifications Settings
export const updateNotificationSetting = async (type, color) => {
  const prisma = new PrismaClient();

  return init()
    .then(async ({ data }) => {
      if (type === "Like") {
        console.log(data);
        return prisma.user
          .findFirst({
            where: {
              id: data.id,
            },
            select: {
              like_notification: true,
            },
          })
          .then(async (oldValue) => {
            console.log(oldValue);
            return prisma.user
              .update({
                where: { id: data.id },
                data: {
                  like_notification: oldValue.like_notification === 0 ? 1 : 0,
                },
              })
              .then(() => {
                return {
                  message: fetch.user.setting.update.success.message,
                  status: fetch.user.setting.update.success.statut,
                };
              })
              .catch((error) => {
                console.log(error);
                return {
                  message: fetch.user.setting.update.error.message,
                  status: fetch.user.setting.update.error.statut,
                };
              });
          })
          .catch((error) => {
            console.log(error);
            return {
              message: fetch.user.get.error.message,
              status: fetch.user.get.error.status,
            };
          });
      }

      if (type === "Comment") {
        return prisma.user
          .findFirst({
            where: { id: data.id },
            select: { comment_notification: true },
          })
          .then(async (oldValue) => {
            return prisma.user
              .update({
                where: {
                  id: data.id,
                },
                data: {
                  comment_notification:
                    oldValue.comment_notification === 0 ? 1 : 0,
                },
              })
              .then(() => {
                return {
                  message: fetch.user.setting.update.success.message,
                  status: fetch.user.setting.update.success.statut,
                };
              })
              .catch((error) => {
                console.log(error);
                return {
                  message: fetch.user.setting.update.error.message,
                  status: fetch.user.setting.update.error.statut,
                };
              });
          })
          .catch((error) => {
            console.log(error);
            return {
              message: fetch.user.get.error.message,
              status: fetch.user.get.error.status,
            };
          });
      }

      if (type === "Message") {
        return prisma.user
          .findFirst({
            where: { id: data.id },
            select: { message_notification: true },
          })
          .then(async (oldValue) => {
            return prisma.user
              .update({
                where: {
                  id: data.id,
                },
                data: {
                  message_notification:
                    oldValue.message_notification === 0 ? 1 : 0,
                },
              })
              .then(() => {
                return {
                  message: fetch.user.setting.update.success.message,
                  status: fetch.user.setting.update.success.statut,
                };
              })
              .catch((error) => {
                console.log(error);
                return {
                  message: fetch.user.setting.update.error.message,
                  status: fetch.user.setting.update.error.statut,
                };
              });
          })
          .catch((error) => {
            console.log(error);
            return {
              message: fetch.user.get.error.message,
              status: fetch.user.get.error.status,
            };
          });
      }

      if (type === "Dark Mode") {
        return prisma.user
          .findFirst({
            where: { id: data.id },
            select: { darkMode: true },
          })
          .then(async (oldValue) => {
            return prisma.user
              .update({
                where: { id: data.id },
                data: {
                  darkMode: oldValue.darkMode === false ? true : false,
                },
              })
              .then(() => {
                return {
                  message: fetch.user.setting.update.success.message,
                  status: fetch.user.setting.update.success.statut,
                };
              })
              .catch((error) => {
                console.log(error);
                return {
                  message: fetch.user.setting.update.error.message,
                  status: fetch.user.setting.update.error.statut,
                };
              });
          })
          .catch((error) => {
            console.log(error);
            return {
              message: fetch.user.get.error.message,
              status: fetch.user.get.error.statut,
            };
          });
      }

      if (type === "Display Follows") {
        return prisma.user
          .findFirst({
            where: {
              id: data.id,
            },
            select: {
              display_follow: true,
            },
          })
          .then(async (oldValue) => {
            return prisma.user
              .update({
                where: { id: data.id },
                data: { display_follow: oldValue.display_follow === 1 ? 0 : 1 },
              })
              .then(() => {
                return {
                  message: fetch.user.setting.update.success.message,
                  status: fetch.user.setting.update.success.statut,
                };
              })
              .catch((error) => {
                console.log(error);
                return {
                  message: fetch.user.setting.update.error.message,
                  status: fetch.user.setting.update.error.statut,
                };
              });
          })
          .catch((error) => {
            console.log(error);
            return {
              message: fetch.user.get.error.message,
              status: fetch.user.get.error.status,
            };
          });
      }

      if (type === "Display Followers") {
        return prisma.user
          .findFirst({
            where: {
              id: data.id,
            },
            select: {
              display_follower: true,
            },
          })
          .then(async (oldValue) => {
            return prisma.user.update({
              where: { id: data.id },
              data: {
                display_follower: oldValue.display_follower === 1 ? 0 : 1,
              },
            });
          })
          .then(() => {
            return {
              message: fetch.user.setting.update.success.message,
              status: fetch.user.setting.update.success.statut,
            };
          })
          .catch((error) => {
            console.log(error);
            return {
              message: fetch.user.setting.update.error.message,
              status: fetch.user.setting.update.error.statut,
            };
          })
          .catch((error) => {
            console.log(error);
            return {
              message: fetch.user.get.error.message,
              status: fetch.user.get.error.status,
            };
          });
      }

      if (type === "ColorScheme") {
        return prisma.user
          .update({
            where: {
              id: data.id,
            },
            data: {
              colorScheme: color,
            },
          })
          .then(() => {
            return {
              message: fetch.user.setting.update.success.message,
              status: fetch.user.setting.update.success.statut,
            };
          })
          .catch((error) => {
            console.log(error);
            return {
              message: fetch.user.setting.update.error.message,
              status: fetch.user.setting.update.error.statut,
            };
          });
      }

      if (type === "Default Feed") {
        return prisma.user
          .findFirst({
            where: { id: data.id },
            select: { followedFeedView: true },
          })
          .then(async (oldValue) => {
            return prisma.user
              .update({
                where: { id: data.id },
                data: {
                  followedFeedView:
                    oldValue.followedFeedView === false ? true : false,
                },
              })
              .then(() => {
                return {
                  message: fetch.user.setting.update.success.message,
                  status: fetch.user.setting.update.success.statut,
                };
              })
              .catch((error) => {
                console.log(error);
                return {
                  message: fetch.user.setting.update.error.message,
                  status: fetch.user.setting.update.error.statut,
                };
              });
          })
          .catch((error) => {
            console.log(error);
            return {
              message: fetch.user.get.error.message,
              status: fetch.user.get.error.statut,
            };
          });
      }
    })
    .catch((error) => {
      console.log(error);
      return {
        message: fetch.user.init.error.message,
        status: fetch.user.init.error.status,
      };
    })
    .finally(() => {
      prisma.$disconnect();
    });
};

// Get User Posts
export async function GetUserPosts(name, skip) {
  const prisma = new PrismaClient();

  return prisma.user
    .findFirst({
      where: {
        name: name,
      },
      select: {
        id: true,
      },
    })
    .then(async (user) => {
      return prisma.post
        .findMany({
          where: {
            author_id: parseInt(user.id),
            type: "post",
          },
          select: {
            id: true,
            createdAt: true,
            content: true,
            author: {
              select: {
                id: true,
                name: true,
                picture: true,
              },
            },
            picture: true,
            shares: true,
            likes: true,
            bookmarks: true,
            type: true,
            hashtags: true,
            comments: {
              select: {
                id: true,
                content: true,
                createdAt: true,
                author: {
                  select: {
                    id: true,
                    name: true,
                    picture: true,
                  },
                },
              },
            },
            userslist_likes: {
              select: {
                post_id: true,
                user: {
                  select: {
                    id: true,
                    name: true,
                    picture: true,
                  },
                },
              },
            },
            bookmark_data: {
              select: {
                post_id: true,
                user_id: true,
              },
            },
            share_data: {
              select: {
                id: true,
                createdAt: true,
                content: true,
                author: {
                  select: {
                    id: true,
                    name: true,
                    picture: true,
                  },
                },
                hashtags: true,
              },
            },
          },
          orderBy: { id: "desc" },
          skip: skip,
          take: 5,
        })
        .then(async (response) => {
          return {
            data: response,
            message: fetch.post.getUserPosts.success.message,
            status: fetch.post.getUserPosts.success.status,
          };
        })
        .catch((error) => {
          console.log(error);
          return {
            message: fetch.post.getUserPosts.error.message,
            status: fetch.post.getUserPosts.error.status,
          };
        });
    })
    .catch(() => {
      return {
        message: fetch.user.get.error.message,
        status: fetch.user.get.error.status,
      };
    })
    .finally(() => {
      prisma.$disconnect();
    });
}

// Get User Posts Liked
export async function GetUserPostsLiked(name, skip) {
  const prisma = new PrismaClient();

  return prisma.user
    .findFirst({
      where: {
        name: name,
      },
      select: {
        id: true,
      },
    })
    .then(async (user) => {
      return prisma.post
        .findMany({
          where: {
            userslist_likes: {
              some: {
                user_id: user.id,
              },
            },
          },
          include: {
            comments: {
              select: {
                id: true,
                content: true,
                author: {
                  select: {
                    id: true,
                    picture: true,
                    name: true,
                  },
                },
                createdAt: true,
              },
            },
            author: {
              select: {
                id: true,
                name: true,
                picture: true,
              },
            },
            userslist_likes: {
              select: {
                user: {
                  select: {
                    id: true,
                  },
                },
              },
            },
            bookmark_data: {
              select: {
                user_id: true,
                post_id: true,
              },
            },
            share_data: {
              select: {
                id: true,
                content: true,
                picture: true,
                createdAt: true,
                author: {
                  select: {
                    id: true,
                    picture: true,
                    name: true,
                  },
                },
              },
            },
          },
          orderBy: {
            id: "desc",
          },
          skip: skip,
          take: 5,
        })
        .then((response) => {
          return {
            data: response,
            message: fetch.user.post.get.liked.success.message,
            status: fetch.user.post.get.liked.success.status,
          };
        })
        .catch((error) => {
          console.log(error);
          return {
            message: fetch.user.post.get.liked.error.message,
            status: fetch.user.post.get.liked.error.status,
          };
        });
    })
    .catch(() => {
      return {
        message: fetch.user.get.error.message,
        status: fetch.user.get.error.status,
      };
    })
    .finally(() => {
      prisma.$disconnect();
    });
}

// Get User Posts Shared
export async function GetUserPostsShared(name, skip) {
  const prisma = new PrismaClient();

  return prisma.user
    .findFirst({
      where: {
        name: name,
      },
      select: {
        id: true,
      },
    })
    .then(async (user) => {
      return prisma.post
        .findMany({
          where: {
            author_id: parseInt(user.id),
            type: "share",
          },
          select: {
            id: true,
            createdAt: true,
            content: true,
            author: {
              select: {
                id: true,
                name: true,
                picture: true,
              },
            },
            shares: true,
            likes: true,
            bookmarks: true,
            type: true,
            hashtags: true,
            bookmark_data: {
              select: {
                user_id: true,
                post_id: true,
              },
            },
            comments: {
              select: {
                id: true,
                content: true,
                createdAt: true,
                author: {
                  select: {
                    id: true,
                    name: true,
                    picture: true,
                  },
                },
              },
            },
            userslist_likes: {
              select: {
                post_id: true,
                user: {
                  select: {
                    id: true,
                    name: true,
                    picture: true,
                  },
                },
              },
            },
            share_data: {
              select: {
                id: true,
                createdAt: true,
                content: true,
                author: {
                  select: {
                    id: true,
                    name: true,
                    picture: true,
                  },
                },
                hashtags: true,
              },
            },
          },
          orderBy: {
            id: "desc",
          },
          skip: skip,
          take: 5,
        })
        .then((response) => {
          return {
            data: response,
            message: fetch.user.post.get.shared.success.message,
            status: fetch.user.post.get.shared.success.status,
          };
        })
        .catch((error) => {
          console.log(error);
          return {
            message: fetch.user.post.get.shared.error.message,
            status: fetch.user.post.get.shared.error.status,
          };
        });
    })
    .catch(() => {
      return {
        message: fetch.user.get.error.message,
        status: fetch.user.get.error.message.status,
      };
    })
    .finally(() => {
      prisma.$disconnect();
    });
}

export async function GetUserMedias(name, skip) {
  const prisma = new PrismaClient();

  return prisma.user
    .findFirst({
      where: {
        name: name,
      },
      select: {
        id: true,
      },
    })
    .then(async (user) => {
      return prisma.post
        .findMany({
          where: {
            author_id: user.id,
          },
          select: {
            id: true,
            picture: true,
          },
          orderBy: {
            id: "asc",
          },
          skip: skip,
          take: 5,
        })
        .then(async (data) => {
          const filteredData = data.filter((post) => post.picture.length > 0);

          return {
            data: filteredData,
            message: "ok",
            status: 200,
          };
        })
        .catch((error) => {
          console.log(error);
          return {
            message: "lol",
            status: 400,
          };
        });
    })
    .catch((error) => {
      console.log(error);
      return {
        message: fetch.user.get.error.message,
        status: fetch.user.get.error.status,
      };
    })
    .finally(() => {
      prisma.$disconnect();
    });
}

// Get User Details
export async function GetUserDetails(name) {
  const prisma = new PrismaClient();

  return prisma.user
    .findFirst({
      where: {
        name: name,
      },
      select: {
        id: true,
        name: true,
        picture: true,
        cover: true,
        darkMode: true,
        followedFeedView: true,
        posts: {
          select: { id: true, type: true, picture: true },
        },
        comments: {
          select: { id: true },
        },
        posts_liked: {
          select: { id: true },
        },
        userFollowed: {
          select: {
            user1_id: true,
            user2_id: true,
          },
        },
        userFollower: {
          select: {
            user1_id: true,
            user2_id: true,
          },
        },
      },
    })
    .then((response) => {
      if (response === null) {
        return {
          message: fetch.user.get.error.message,
          status: fetch.user.get.error.status,
        };
      }

      return {
        data: response,
        message: fetch.user.get.success.message,
        status: fetch.user.get.success.status,
      };
    })
    .catch((error) => {
      console.log(error);
      return {
        message: fetch.user.get.error.message,
        status: fetch.user.get.error.status,
      };
    })
    .finally(() => {
      prisma.$disconnect();
    });
}

export const getNotifications = async () => {
  const prisma = new PrismaClient();

  return init()
    .then(async ({ data }) => {
      return prisma.notification
        .findMany({
          where: {
            for_id: parseInt(data.id),
          },
          select: {
            id: true,
            isRead: true,
            type: true,
            createdAt: true,
            author: {
              select: {
                id: true,
                picture: true,
                name: true,
              },
            },
            Conversation: {
              select: {
                id: true,
              },
            },
            Post: {
              select: {
                id: true,
              },
            },
          },
        })
        .then(async (response) => {
          return {
            data: response,
            message: fetch.user.notification.get.success.message,
            status: fetch.user.notification.get.success.status,
          };
        })
        .catch((error) => {
          console.log(error);
          return {
            message: fetch.user.notification.get.error.message,
            status: fetch.user.notification.get.error.status,
          };
        });
    })
    .catch((error) => {
      console.log(error);
      return {
        message: fetch.user.init.error.message,
        status: fetch.user.init.error.status,
      };
    })
    .finally(() => {
      prisma.$disconnect();
    });
};

export const getConversations = async (searchParams) => {
  const prisma = new PrismaClient();

  return init()
    .then(async ({ data }) => {
      return prisma.conversation
        .findMany({
          where: {
            OR: [{ participant1Id: data.id }, { participant2Id: data.id }],
          },
          select: {
            id: true,
            participant1: {
              select: {
                name: true,
                picture: true,
              },
            },
            participant1Id: true,
            participant2: {
              select: {
                name: true,
                picture: true,
              },
            },
            participant2Id: true,
            messages: {
              take: 1,
              orderBy: { createdAt: "desc" },
            },
          },
        })
        .then((response) => {
          if (searchParams?.query?.length > 0) {
            let filteredConversation = response.filter(
              (conversation) =>
                conversation.participant1.name
                  .toLowerCase()
                  .includes(searchParams.query.toLowerCase()) ||
                conversation.participant2.name
                  .toLowerCase()
                  .includes(searchParams.query.toLowerCase())
            );

            return {
              data: filteredConversation,
              message: fetch.conversation.get.success.message,
              status: fetch.conversation.get.success.status,
            };
          }

          return {
            data: response,
            message: fetch.conversation.get.success.message,
            status: fetch.conversation.get.success.status,
          };
        })
        .catch((error) => {
          console.log(error);
          return {
            message: fetch.conversation.get.error.message,
            status: fetch.conversation.get.error.status,
          };
        });
    })
    .catch((error) => {
      console.log(error);
      return {
        message: fetch.user.init.error.message,
        status: fetch.user.init.error.status,
      };
    })
    .finally(() => {
      prisma.$disconnect();
    });
};

export const getMessages = async (id) => {
  const prisma = new PrismaClient();

  return prisma.message
    .findMany({
      where: {
        conversationId: parseInt(id),
      },
      select: {
        content: true,
        createdAt: true,
        sender: {
          select: {
            name: true,
            picture: true,
          },
        },
        senderId: true,
        isRead: true,
        conversation: {
          select: {
            participant1: {
              select: {
                name: true,
                picture: true,
              },
            },
            participant2: {
              select: {
                name: true,
                picture: true,
              },
            },
          },
        },
      },
    })
    .then(async (response) => {
      if (response.length === 0) {
        return {
          message: fetch.conversation.message.get.error.noExist.message,
          status: fetch.conversation.message.get.error.noExist.status,
        };
      } else {
        return {
          data: response,
          message: fetch.conversation.message.get.success.message,
          status: fetch.conversation.message.get.success.status,
        };
      }
    })
    .catch((error) => {
      console.log(error);
      return {
        message: fetch.conversation.message.get.error.message,
        status: fetch.conversation.message.get.error.status,
      };
    })
    .finally(() => {
      prisma.$disconnect();
    });
};

export const followUser = async (name) => {
  const prisma = new PrismaClient();

  return init()
    .then(async ({ data }) => {
      return prisma.user
        .findFirst({
          where: { name: name },
          select: { id: true },
        })
        .then(async (user) => {
          return prisma.follow
            .create({
              data: {
                user1_id: data.id,
                user2_id: user.id,
              },
            })
            .then(() => {
              return {
                message: fetch.follow.create.success.message,
                status: fetch.follow.create.success.status,
              };
            })
            .catch((error) => {
              console.log(error);
              return {
                message: fetch.follow.create.error.message,
                status: fetch.follow.create.error.status,
              };
            });
        })
        .catch((error) => {
          console.log(error);
          return {
            message: fetch.user.get.error.message,
            status: fetch.user.get.error.status,
          };
        });
    })
    .catch((error) => {
      console.log(error);
      return {
        message: fetch.user.init.error.message,
        status: fetch.user.init.error.status,
      };
    })
    .finally(() => {
      prisma.$disconnect();
    });
};

export const unfollowUser = async (name) => {
  const prisma = new PrismaClient();

  return init()
    .then(async ({ data }) => {
      return prisma.user
        .findFirst({
          where: { name: name },
          select: { id: true },
        })
        .then(async (user) => {
          return prisma.follow
            .deleteMany({
              where: { user1_id: data.id, user2_id: user.id },
            })
            .then(() => {
              return {
                message: fetch.follow.delete.success.message,
                status: fetch.follow.delete.success.status,
              };
            })
            .catch((error) => {
              console.log(error);
              return {
                message: fetch.follow.delete.error.message,
                status: fetch.follow.delete.error.status,
              };
            });
        })
        .catch((error) => {
          console.log(error);
          return {
            message: fetch.user.get.error.message,
            status: fetch.user.get.error.status,
          };
        });
    })
    .catch((error) => {
      console.log(error);
      return {
        message: fetch.user.init.error.message,
        status: fetch.user.init.error.status,
      };
    })
    .finally(() => {
      prisma.$disconnect();
    });
};

export const getFollower = async () => {
  const prisma = new PrismaClient();

  return init()
    .then(async ({ data }) => {
      return prisma.follow
        .findMany({
          where: {
            user1_id: data.id,
          },
          select: {
            user2: {
              select: {
                name: true,
                picture: true,
                id: true,
              },
            },
          },
        })
        .then((response) => {
          return {
            data: response,
            message: fetch.follow.get.success.message,
            status: fetch.follow.get.success.status,
          };
        })
        .catch((error) => {
          console.log(error);
          return {
            message: fetch.follow.get.error.message,
            status: fetch.follow.get.error.status,
          };
        });
    })
    .catch((error) => {
      console.log(error);
      return {
        message: fetch.user.init.error.message,
        status: fetch.user.init.error.status,
      };
    })
    .finally(() => {
      prisma.$disconnect();
    });
};

export const getSpecifiqueUserFollows = async (name, skip) => {
  const prisma = new PrismaClient();

  return prisma.user
    .findFirst({
      where: { name: name },
      select: { id: true },
    })
    .then(async (user) => {
      return prisma.follow
        .findMany({
          where: {
            user1_id: user.id,
          },
          select: {
            user2: {
              select: {
                name: true,
                picture: true,
                id: true,
              },
            },
          },
          skip: skip,
          take: 6,
        })
        .then((response) => {
          return {
            data: response,
            message: fetch.follow.get.success.message,
            status: fetch.follow.get.success.status,
          };
        })
        .catch((error) => {
          console.log(error);
          return {
            data: response,
            message: fetch.follow.get.error.message,
            status: fetch.follow.get.error.status,
          };
        });
    })
    .catch((error) => {
      console.log(error);
      return {
        message: fetch.user.get.error.message,
        status: fetch.user.get.error.status,
      };
    })
    .finally(() => {
      prisma.$disconnect();
    });
};

export const getSpecifiqueUserFollowers = async (name, skip) => {
  const prisma = new PrismaClient();

  return prisma.user
    .findFirst({
      where: { name: name },
      select: { id: true },
    })
    .then(async (user) => {
      return prisma.follow
        .findMany({
          where: {
            user2_id: user.id,
          },
          select: {
            user1: {
              select: {
                name: true,
                picture: true,
                id: true,
              },
            },
          },
          skip: skip,
          take: 6,
        })
        .then((response) => {
          return {
            data: response,
            message: fetch.follower.get.success.message,
            status: fetch.follower.get.success.status,
          };
        })
        .catch((error) => {
          console.log(error);
          return {
            message: fetch.follower.get.error.message,
            status: fetch.follower.get.error.status,
          };
        });
    })
    .catch((error) => {
      console.log(error);
      return {
        message: fetch.user.get.error.message,
        status: fetch.user.get.error.status,
      };
    })
    .finally(() => {
      prisma.$disconnect();
    });
};
