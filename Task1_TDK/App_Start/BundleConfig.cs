using System.Web;
using System.Web.Optimization;

namespace Task1_TDK
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.validate*"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/bootstrap.js",
                      "~/Scripts/respond.js",
                      "~/assets/plugins/global/plugins.bundle.js",
                      "~/assets/plugins/custom/prismjs/prismjs.bundle.js",
                      "~/assets/js/scripts.bundle.js",
                      "~/assets/plugins/custom/fullcalendar/fullcalendar.bundle.js",
                      "~/assets/js/pages/widgets.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/bootstrap.css",
                      "~/Content/site.css"));

            bundles.Add(new StyleBundle("~/AssetMetronic/css").Include(
                      "~/assets/css/Font.css",
                      "~/assets/plugins/custom/fullcalendar/fullcalendar.bundle.css",
                      "~/assets/plugins/global/plugins.bundle.css",
                      "~/assets/plugins/custom/prismjs/prismjs.bundle.css",
                      "~/assets/css/style.bundle.css",
                      "~/assets/css/themes/layout/header/base/light.css",
                      "~/assets/css/themes/layout/header/menu/light.css",
                      "~/assets/css/themes/layout/brand/dark.css",
                      "~/assets/css/themes/layout/aside/dark.css",
                      "~/assets/plugins/custom/datatables/datatables.bundle.css",
                      "~/assets/plugins/custom/uppy/uppy.bundle.css",
                      "~/assets/slick/swiper.min.css",
                      "~/assets/slick/form.css"
                      ));

            bundles.Add(new ScriptBundle("~/AssetMetronic/JS").Include(
                      ));

            bundles.Add(new StyleBundle("~/AssetLogin/css").Include(
                "~/assets/css/Font.css",
                "~/assets/plugins/global/plugins.bundle.css",
                "~/assets/plugins/custom/prismjs/prismjs.bundle.css",
                "~/assets/css/style.bundle.css",
                "~/assets/css/themes/layout/header/base/light.css",
                "~/assets/css/themes/layout/header/menu/light.css",
                "~/assets/css/themes/layout/brand/dark.css",
                "~/assets/css/themes/layout/aside/dark.css"
                ));

            bundles.Add(new ScriptBundle("~/AssetLogin/JS").Include(
                "~/assets/plugins/global/plugins.bundle.js",
                "~/assets/plugins/custom/prismjs/prismjs.bundle.js",
                "~/assets/js/scripts.bundle.js",
                "~/assets/js/pages/features/miscellaneous/blockui.js",
                "~/assets/js/Notification.js",
                "~/assets/js/pages/custom/login/login-general.js",
                "~/assets/js/pages/crud/forms/widgets/bootstrap-switch.js"
                ));
        }
    }
}
