export const fetch = {
  post: {
    delete: {
      user: {
        error: {
          message: "You do not have permission to delete this post.",
          status: 400,
        },
      },
      error: {
        message: "The post you are trying to delete does not exist.",
        status: 400,
      },
      success: {
        message: "The post has been deleted",
        status: 200,
      },
    },
    create: {
      user: {
        error: {
          message: "It appears that you are not logged in to a user account.",
          status: 400,
        },
      },
      error: {
        message: "Your post must contain at least 5 characters.",
        status: 400,
      },
      success: {
        message: "Your post has been created.",
        status: 200,
      },
    },
    getAll: {
      success: {
        message: "The list of posts to be retrieved was retrieved",
        status: 200,
      },
      error: {
        message:
          "An error occurred while retrieving posts, please refresh the page.",
        status: 400,
      },
    },
    getUserPosts: {
      success: {
        message: "The list of user positions has been successfully retrieved",
        status: 200,
      },
      error: {
        message: `The user's post list could not be retrieved`,
        status: 400,
      },
    },
    getDetails: {
      success: {
        message: "The details of the post were retrieved",
        status: 200,
      },
      error: {
        message: "Post details could not be retrieved",
        status: 400,
      },
    },
    getTrend: {
      success: {
        message: "Ok",
        status: 200,
      },
      error: {
        message: "Nop",
        error: 400,
      },
    },
    share: {
      success: {
        message: "The post was successfully shared.",
        status: 200,
      },
      error: {
        message: "An error has occurred, try again",
        status: 400,
      },
    },
  },
  comment: {
    create: {
      success: {
        message: "Your comment has been sent.",
        status: 200,
      },
      error: {
        message: "Your comment must contain at least 5 characters.",
        status: 400,
      },
    },
  },
  bookmark: {
    create: {
      success: {
        message: "The post has been saved in your bookmarks",
        status: 200,
      },
      error: {
        message: "An error has occurred",
        status: 400,
        tooSmall: {
          message: "You must provide a tag!",
          status: 400,
        },
      },
    },
    remove: {
      success: {
        message: "Post remove to your bookmarks.",
        status: 200,
      },
      error: {
        message: "An error occurred, try again!",
        status: 400,
      },
    },
  },
  user: {
    init: {
      success: {
        message: "User initialized successfully",
        status: 200,
      },
      error: {
        message: "An error occurred during user initialization",
        status: 400,
      },
    },
    get: {
      success: {
        message: "The user has been successfully recovered",
        status: 200,
      },
      error: {
        message: "The user could not be recovered, try to refresh page",
        status: 400,
      },
    },
    post: {
      get: {
        shared: {
          success: {
            message: "The list of posts shared by the user has been retrieved",
            status: 200,
          },
          error: {
            message:
              "The list of posts shared by the user could not be retrieved",
            status: 400,
          },
        },
        liked: {
          success: {
            message: "The list of posts liked by the user has been retrieved",
            status: 200,
          },
          error: {
            message:
              "The list of posts liked by the user could not be retrieved",
            status: 400,
          },
        },
        bookmarked: {
          success: {
            message:
              "The list of posts bookmarked by the user has been retrieved",
            status: 200,
          },
          error: {
            message:
              "The list of posts bookmarked by the user could not be retrieved",
            status: 400,
          },
        },
        media: {
          success: {
            message: "The list of medias by the user has been retrieved",
            status: 200,
          },
          error: {
            message: "The list of medias by the user could not be retrieved",
            status: 400,
          },
        },
      },
    },
    bookmark: {
      get: {
        success: {
          message: "The list of bookmarks has been retrieved",
          status: 200,
        },
        error: {
          message: "The list of bookmarks could not be retrieved",
          status: 400,
        },
      },
    },
    register: {
      success: {
        message: "Your account has been successfully created, you can log in",
        status: 200,
      },
      error: {
        alreadyExist: {
          message: "User with this name or email already exists",
          status: 400,
        },
        message: "Your account could not be created, please try again",
        status: 400,
      },
    },
    login: {
      success: {
        message: "Connection successful",
        status: 200,
      },
      error: {
        message: "The user does not exist",
        statut: 400,
      },
    },
    notification: {
      get: {
        success: {
          message: "Notifications have been retrieved successfully.",
          status: 200,
        },
        error: {
          message: "Notifications could not be retrieved.",
          status: 400,
        },
      },
    },
    setting: {
      update: {
        success: {
          message: "Setting updated successfully.",
          statut: 200,
        },
        error: {
          message: "Setting not updated successfully.",
        },
      },
    },
    profil: {
      update: {
        success: {
          message: "Profile updated successfully",
          status: 200,
        },
        error: {
          message: "Profile could not updated successfully",
          status: 400,
        },
      },
    },
  },
  sidebar: {
    tophashtags: {
      success: {
        message: "The lists of the top hashtags have been recovered",
        status: 200,
      },
      error: {
        message: "The lists of top hashtags could not be retrieved",
        status: 400,
      },
    },
    lastusers: {
      success: {
        message: "The lists of last users have been recovered",
        status: 200,
      },
      error: {
        message: "The lists of last users could not be retrieved",
        status: 400,
      },
    },
  },
  follow: {
    get: {
      success: {
        message: "The subscriptions list has been successfully retrieved.",
        status: 200,
      },
      error: {
        message: "The list of subscriptions could not be retrieved",
        status: 400,
      },
    },
    create: {
      success: {
        message: "You are now following this user",
        status: 200,
      },
      error: {
        message: "An error has occurred, try again!",
        status: 400,
      },
    },
    delete: {
      success: {
        message: "You no longer follow this user",
        status: 200,
      },
      error: {
        message: "An error has occured, try again!",
        status: 400,
      },
    },
  },
  follower: {
    get: {
      success: {
        message: "The subscriber list has been successfully retrieved.",
        status: 200,
      },
      error: {
        message: "The list of subscribers could not be retrieved",
        status: 400,
      },
    },
  },
  conversation: {
    create: {
      alreadyExit: {
        message: "A conversation already exists with this user",
        status: 200,
      },
      success: {
        message: "The conversation was created",
        status: 200,
      },
      error: {
        message: "The conversation could not be created, try again",
        statut: 400,
      },
    },
    get: {
      success: {
        message: "The list conversations was successfully retrieved.",
        status: 200,
      },
      error: {
        message:
          "The list of conversations could not be successfully retrieved.",
        status: 400,
      },
    },
    message: {
      get: {
        success: {
          message:
            "The list of messages from this conversation was successfully retrieved.",
          status: 200,
        },
        error: {
          noExist: {
            message: `This conversation doesn't exist.`,
            status: 400,
          },
          message:
            "The list of messages from this conversation could not be successfully retrieved.",
          status: 400,
        },
      },
    },
  },
  searchbar: {
    success: {
      message: "Search results were found.",
      status: 200,
    },
    error: {
      message: "No results when searching",
      status: 400,
    },
  },
};
