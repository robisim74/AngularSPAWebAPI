using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Diagnostics;
using System.Runtime.InteropServices;

namespace AngularSPAWebAPI.Services
{
    public static class ShellExtensions
    {
        private static Process process;

        public static void Shell(this IApplicationBuilder app, string cmd)
        {
            try
            {
                if (RuntimeInformation.IsOSPlatform(OSPlatform.Windows))
                {
                    process = new Process
                    {
                        StartInfo = new ProcessStartInfo("cmd.exe", "/C " + cmd) { UseShellExecute = false }
                    };
                }
                else if (RuntimeInformation.IsOSPlatform(OSPlatform.Linux))
                {
                    //
                }
                else if (RuntimeInformation.IsOSPlatform(OSPlatform.OSX))
                {
                    //
                }

                process.Start();

                // Registers the application shutdown event.
                var applicationLifetime = app.ApplicationServices.GetRequiredService<IApplicationLifetime>();
                applicationLifetime.ApplicationStopping.Register(OnShutDown);

            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
            }
        }

        private static void OnShutDown()
        {
            if (process != null)
            {
                try
                {
                    Console.WriteLine($"Killing npm process ( {process.StartInfo.FileName} {process.StartInfo.Arguments} )");
                    process.Kill();
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"Unable to kill npm process ( {process.StartInfo.FileName} {process.StartInfo.Arguments} )");
                    Console.WriteLine($"Exception: {ex}");
                }
            }
        }
    }
}
