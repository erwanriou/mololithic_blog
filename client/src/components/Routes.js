import { lazy } from "react"

// LANDINGS
const Posts = lazy(() =>
  import(/* webpackPrefetch: true */ "./landing/post/Posts")
)
const Post = lazy(() =>
  import(/* webpackPrefetch: true */ "./landing/post/Post")
)
const Yoga = lazy(() =>
  import(/* webpackPrefetch: true */ "./landing/yoga/Yoga")
)

// REGISTER
const AuthLogin = lazy(() =>
  import(/* webpackPrefetch: true */ "./auth/AuthLogin")
)
const AuthRegister = lazy(() =>
  import(/* webpackPrefetch: true */ "./auth/AuthRegister")
)

// INFO
const InfoPsychology = lazy(() =>
  import(/* webpackPrefetch: true */ "./info/InfoPsychology")
)
const InfoAbout = lazy(() =>
  import(/* webpackPrefetch: true */ "./info/InfoAbout")
)
const InfoContact = lazy(() =>
  import(/* webpackPrefetch: true */ "./info/InfoContact")
)
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
    },
    {
      path: "meta.yoga.url",
      component: Yoga
    }
  ],
  infoPages: [
    {
      path: "meta.psychology.url",
      component: InfoPsychology
    },
    {
      path: "meta.about.url",
      component: InfoAbout
    },
    {
      path: "meta.contact.url",
      component: InfoContact
    },
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
