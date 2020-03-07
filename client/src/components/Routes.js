import { lazy } from "react"

const Posts = lazy(() =>
  import(/* webpackPrefetch: true */ "./landing/post/Posts")
)
const Post = lazy(() =>
  import(/* webpackPrefetch: true */ "./landing/post/Post")
)

// REGISTER
const AuthLogin = lazy(() =>
  import(/* webpackPrefetch: true */ "./auth/AuthLogin")
)
const AuthRegister = lazy(() =>
  import(/* webpackPrefetch: true */ "./auth/AuthRegister")
)

// INFO
const InfoPrivacy = lazy(() =>
  import(/* webpackPrefetch: true */ "./info/InfoPrivacy")
)

// DASHBOARD GLOBAL
const DashboardMain = lazy(() =>
  import(/* webpackPrefetch: true */ "./dashboard/DashboardMain")
)

// DASHBOARD ADMIN
const DashboardAdmin = lazy(() =>
  import(/* webpackPrefetch: true */ "./dashboard/admin/DashboardAdmin")
)
const ManagePosts = lazy(() =>
  import(/* webpackPrefetch: true */ "./dashboard/admin/PostNew")
)

export const Routes = {
  landingPages: [
    {
      path: "meta.blog.url",
      component: Posts
    },
    {
      path: "meta.blog-post.url",
      component: Post
    }
  ],
  infoPages: [
    {
      path: "meta.privacy-policy.url",
      component: InfoPrivacy
    }
  ],
  auth: [
    {
      path: "/login",
      component: AuthLogin
    },
    {
      path: "/register",
      component: AuthRegister
    }
  ],
  dashboard: {
    global: [
      {
        exact: true,
        path: "/dashboard/main",
        component: DashboardMain
      }
    ],
    user: [],
    admin: [
      {
        path: "/dashboard/main",
        roles: "ROLE_ADMIN",
        component: DashboardAdmin
      },
      {
        path: "/dashboard/new-post",
        roles: "ROLE_ADMIN",
        component: ManagePosts
      },
      {
        path: "/dashboard/edit-post/:postId",
        roles: "ROLE_ADMIN",
        component: ManagePosts
      }
    ]
  }
}
