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
  },
  comment: {
    create: {
      success: {
        message: "Your comment has been sent.",
        status: 200,
      },
      error: {
        message: "Your post must contain at least 5 characters.",
        status: 400,
      },
    },
  },
  bookmark: {
    success: {
      message: "The post has been saved in your bookmarks",
      status: 200,
    },
    error: {
      message: "An error has occurred",
      status: 400,
    },
  },
};
