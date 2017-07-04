import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

// We use PathLocationStrategy - the default "HTML 5 pushState" style:
// - https://angular.io/docs/ts/latest/guide/router.html#!#browser-url-styles
// - Router on the server (see Startup.cs) must match the router on the client to use PathLocationStrategy
// and Lazy Loading Modules:
// -- https://angular.io/guide/ngmodule#lazy-loading-modules-with-the-router
// IMPORTANT note for AOT compilation: include lazy-loaded modules files within the 'tsconfig-aot.json'
const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', loadChildren: './home/home.module#HomeModule' },
    { path: 'account', loadChildren: './account/account.module#AccountModule' },
    { path: 'resources', loadChildren: './resources/resources.module#ResourcesModule' },
    { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule' }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {
            useHash: true,
            preloadingStrategy: PreloadAllModules
        })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
