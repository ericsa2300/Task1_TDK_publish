using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(Task1_TDK.Startup))]
namespace Task1_TDK
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
