"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { fetch } from "../config/text";
import { HashtagsExtrator } from "./hashtagsExtractor";
import { io } from "socket.io-client";
import { writeFile } from "fs/promises";
import { getFollower } from "./user";
import { put } from "@vercel/blob";

// Get All Post List for Feed
export async function GetAllPost(skip, limit) {
  const prisma = new PrismaClient();

  return prisma.post
    .findMany({
      select: {
        id: true,
        createdAt: true,
        content: true,
        picture: true,
        shares: true,
        likes: true,
        bookmarks: true,
        type: true,
        share_id: true,
        comments: true,
        author: {
          select: {
            id: true,
            name: true,
            picture: true,
          },
        },
        userslist_likes: {
          select: {
            post_id: true,
            user: {
              select: {
                id: true,
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
        bookmark_data: {
          select: {
            user_id: true,
            post_id: true,
          },
        },
      },
      orderBy: {
        id: "desc",
      },
      skip: skip,
      take: limit,
    })
    .then(async (response) => {
      return {
        data: response,
        message: fetch.post.getAll.success.message,
        status: fetch.post.getAll.success.status,
      };
    })
    .catch((error) => {
      console.log(error);
      return {
        message: fetch.post.getAll.error.message,
        status: fetch.post.getAll.error.status,
      };
    })
    .finally(() => prisma.$disconnect());
}

// Get Followed Post List for Feed

export async function GetFollowedPost(skip, limit) {
  const { data, message, status } = await getFollower();

  const followedList = [];

  data.forEach((user) => {
    followedList.push(user.user2.id);
  });

  const prisma = new PrismaClient();

  return prisma.post
    .findMany({
      where: {
        author_id: {
          in: followedList,
        },
      },
      select: {
        id: true,
        createdAt: true,
        content: true,
        picture: true,
        shares: true,
        likes: true,
        bookmarks: true,
        type: true,
        share_id: true,
        comments: true,
        author: {
          select: {
            id: true,
            name: true,
            picture: true,
          },
        },
        userslist_likes: {
          select: {
            post_id: true,
            user: {
              select: {
                id: true,
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
        bookmark_data: {
          select: {
            user_id: true,
            post_id: true,
          },
        },
      },
      orderBy: {
        id: "desc",
      },
      skip: skip,
      take: limit,
    })
    .then(async (response) => {
      return {
        data: response,
        message: "ok",
        status: 200,
      };
    })
    .catch((error) => {
      console.log(error);
      return {
        message: "nop",
        status: 400,
      };
    })
    .finally(() => prisma.$disconnect());
}

// Create a new Post
export async function CreatePost(formData, type) {
  // Verification lenght of post content
  if (formData?.get("text").length < 1) {
    return {
      message: fetch.post.create.error.message,
      status: fetch.post.create.error.status,
    };
  }

  const prisma = new PrismaClient();
  const token = cookies().get("token");

  return prisma.user
    .findFirst({
      where: { token: token.value },
      select: { id: true },
    })
    .then((user) => {
      if (!user) {
        return Promise.resolve({
          message: fetch.post.create.user.error.message,
          status: fetch.post.create.user.error.status,
        });
      }

      if (type === "post") {
        // Hashtags Extractor
        return HashtagsExtrator(formData.get("text")).then((hashtags) => {
          // Prepare data for create post
          const data = {
            content: formData?.get("text").toString(),
            author_id: user.id,
            createdAt: new Date(),
            likes: 0,
            shares: 0,
            bookmarks: 0,
            type: "post",
            updatedAt: new Date(),
            hashtags: {
              create: hashtags.map((tag) => ({
                content: tag,
              })),
            },
          };

          // Create a post
          return prisma.post.create({ data }).then(async (response) => {
            // Upload File
            for (const entry of formData.entries()) {
              const [name, value] = entry;

              if (name === "pictures" && value.size > 0) {
                const blob = await put(value.name, value, {
                  access: "public",
                  token:
                    "vercel_blob_rw_Kf4COCuR5c677G4e_c1MW0zOxCFi3ini5U6hHAMmAiUXk0g",
                });

                // Write into Database
                await prisma.postPicture.create({
                  data: {
                    post_id: response.id,
                    url: blob.url,
                  },
                });
              }
            }

            revalidatePath("/Feed");
            return {
              message: fetch.post.create.success.message,
              status: fetch.post.create.success.status,
            };
          });
        });
      } else {
        // If it is a share
        // Prepare data
        const data = {
          content: textarea ? textarea : "",
          author_id: user.id,
          createdAt: new Date(),
          likes: 0,
          share_data: 0,
          bookmarks: 0,
          type: "share",
          updatedAt: new Date(),
          share_id: parseInt(postId),
        };

        return prisma.post.create({ data }).then(() => {
          revalidatePath("/Feed");
          return {
            message: fetch.post.create.success.message,
            status: fetch.post.create.success.status,
          };
        });
      }
    })
    .catch((error) => {
      console.error(error);
      return {
        message: "Internal Server Error, try again",
        status: 500,
      };
    })
    .finally(() => {
      prisma.$disconnect();
    });
}

// Delete a Recent Post
export async function DeletePost(postId) {
  const prisma = new PrismaClient();
  const token = cookies().get("token");

  return prisma.user
    .findFirst({
      where: {
        token: token.value,
      },
      select: {
        id: true,
      },
    })
    .then(async (user) => {
      if (!user) {
        return {
          message: fetch.delete.user.error.message,
          status: fetch.delete.user.error.status,
        };
      }

      return prisma.postPicture
        .deleteMany({
          where: {
            post_id: postId,
          },
        })
        .then(async () => {
          return prisma.comment
            .deleteMany({
              where: { post_id: postId },
            })
            .then(async () => {
              return prisma.postsLiked
                .deleteMany({
                  where: {
                    post_id: postId,
                  },
                })
                .then(async () => {
                  return prisma.hashtags
                    .deleteMany({
                      where: {
                        post_id: postId,
                      },
                    })
                    .then(async () => {
                      return prisma.post
                        .delete({
                          where: {
                            id: postId,
                            author_id: user.id,
                          },
                        })
                        .then(() => {
                          revalidatePath("/Feed");
                          return {
                            message: fetch.post.delete.success.message,
                            status: fetch.post.delete.success.status,
                          };
                        })
                        .catch((error) => {
                          console.log(error);
                        });
                    })
                    .catch((error) => {
                      console.log(error);
                    });
                })
                .catch((error) => console.log(error));
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((error) => {
          console.log(error);
          return {
            message: fetch.post.delete.error.message,
            status: fetch.post.delete.error.status,
          };
        });
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => prisma.$disconnect());
}

// Get a Post Details
export async function GetPostDetails(id) {
  const prisma = new PrismaClient();

  return prisma.post
    .findFirst({
      where: {
        id: parseInt(id),
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
            user_id: true,
            post_id: true,
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
    })
    .then(async (response) => {
      if (response !== null) {
        return {
          data: response,
          message: fetch.post.getDetails.success.message,
          status: fetch.post.getDetails.success.status,
        };
      } else {
        return {
          message: fetch.post.getDetails.error.message,
          status: fetch.post.getDetails.error.status,
        };
      }
    })
    .catch((error) => {
      console.log(error);
      return {
        message: fetch.post.getDetails.error.message,
        status: fetch.post.getDetails.error.status,
      };
    })
    .finally(() => prisma.$disconnect());
}

export async function GetImage(image_id) {
  const prisma = new PrismaClient();

  return prisma.postPicture
    .findFirst({
      where: {
        id: parseInt(image_id),
      },
      select: {
        url: true,
      },
    })
    .then(async (response) => {
      return {
        data: response,
        message: "ok",
        status: 200,
      };
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => prisma.$disconnect());
}

// Reaction to Post (Like/Dislike)
export const ReactionPost = async (postId, value) => {
  const prisma = new PrismaClient();
  const token = cookies().get("token");

  return prisma.user
    .findFirst({
      where: {
        token: token.value,
      },
      select: {
        id: true,
      },
    })
    .then(async (user) => {
      const data = {
        post_id: postId,
        user_id: user.id,
      };

      if (value === "add") {
        return prisma.postsLiked
          .create({ data })
          .then(async () => {
            return prisma.post
              .update({
                where: { id: postId },
                data: { likes: { increment: 1 } },
              })
              .then(async () => {
                const socket = io.connect("http://localhost:3001");
                const socketData = { userid: user.id, post_id: postId };
                socket.emit("post_like", socketData);
                return {
                  message: "ok",
                  status: 200,
                };
              })
              .catch((error) => {
                console.log(error);
              });
          })
          .catch((error) => {
            console.log(error);
          });
      }

      if (value === "remove") {
        return prisma.postsLiked
          .deleteMany({
            where: {
              post_id: parseInt(postId),
              user_id: parseInt(user.id),
            },
          })
          .then(async () => {
            return prisma.post
              .update({
                where: { id: postId },
                data: { likes: { decrement: 1 } },
              })
              .then(() => {
                return { message: "ok", status: 200 };
              })
              .catch((error) => {
                console.log(error);
              });
          })
          .catch((error) => {
            console.log(error);
          });
      }
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      prisma.$disconnect();
    });
};

// Share a Post
export async function SharePost(textarea, files, type, postId) {
  const prisma = new PrismaClient();
  const token = cookies().get("token");

  return prisma.user
    .findFirst({
      where: {
        token: token.value,
      },
      select: {
        id: true,
      },
    })
    .then(async (user) => {
      const data = {
        content: textarea ? textarea : "",
        author_id: user.id,
        createdAt: new Date(),
        likes: 0,
        shares: 0,
        bookmarks: 0,
        type: "share",
        updatedAt: new Date(),
        share_id: parseInt(postId),
      };

      return prisma.post.create({ data }).then(() => {
        const socket = io.connect("http://localhost:3001");
        const socketData = { userid: user.id, post_id: postId };
        socket.emit("post_share", socketData);

        return {
          message: fetch.post.share.success.message,
          status: fetch.post.share.success.status,
        };
      });
    })
    .catch((error) => {
      console.log(error);
      return {
        message: fetch.post.share.error.message,
        status: fetch.post.share.error.status,
      };
    })
    .finally(() => {
      prisma.$disconnect();
    });
}

// Reply To Post
export const ReplyToPost = async (content, postId) => {
  if (content?.length > 5) {
    const prisma = new PrismaClient();

    const token = cookies().get("token");

    return prisma.user
      .findFirst({
        where: {
          token: token.value,
        },
        select: {
          id: true,
        },
      })
      .then(async (user) => {
        if (user) {
          const data = {
            content: content,
            createdAt: new Date(),
            author_id: user.id,
            post_id: parseInt(postId),
          };

          return prisma.comment
            .create({ data })
            .then(() => {
              const socket = io.connect("http://localhost:3001");
              const socketData = { userid: user.id, post_id: postId };
              socket.emit("post_comment", socketData);
            })
            .then(() => {
              prisma.$disconnect();
              return {
                message: fetch.comment.create.success.message,
                status: fetch.comment.create.success.status,
              };
            })
            .catch((error) => {
              console.log(error);
            });
        }
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
  } else {
    return Promise.resolve({
      message: fetch.comment.create.error.message,
      status: fetch.comment.create.error.status,
    });
  }
};

// Get trends
export const GetTrend = async (query, skip) => {
  const prisma = new PrismaClient();

  return prisma.hashtags
    .findMany({
      where: {
        content: `#${query}`,
      },
      select: {
        post: {
          select: {
            id: true,
            createdAt: true,
            content: true,
            picture: true,
            shares: true,
            likes: true,
            bookmarks: true,
            type: true,
            share_id: true,
            comments: true,
            author: {
              select: {
                id: true,
                name: true,
                picture: true,
              },
            },
            userslist_likes: {
              select: {
                post_id: true,
                user: {
                  select: {
                    id: true,
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
            bookmark_data: {
              select: {
                user_id: true,
                post_id: true,
              },
            },
          },
        },
      },
      skip: skip,
      take: 5,
      orderBy: {
        id: "desc",
      },
    })
    .then(async (response) => {
      return {
        data: response,
        message: fetch.post.getTrend.success.message,
        status: fetch.post.getTrend.success.status,
      };
    })
    .catch((error) => {
      console.log(error);
      return {
        message: fetch.post.getTrend.error.message,
        status: fetch.post.getTrend.error.status,
      };
    })
    .finally(() => prisma.$disconnect());
};
