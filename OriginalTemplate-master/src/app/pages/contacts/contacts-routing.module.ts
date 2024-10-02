import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsergridComponent } from './usergrid/usergrid.component';
import { ProfileComponent } from './profile/profile.component';
import { UserlistComponent } from './userlist/userlist.component';
const routes: Routes = [
    {
        path: 'list/:id',
        component: UserlistComponent
    },
    {
        path: 'grid',
        component: UsergridComponent
    },
    {
        path: 'profile',
        component: ProfileComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ContactsRoutingModule { }
