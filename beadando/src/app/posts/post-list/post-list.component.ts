import { Component, Input } from '@angular/core';

import { Post } from '../post-model';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})

export class PostListComponent {
  /*posts=[
    {title: 'First post', content: 'Data of first post'},
    {title: 'Second post', content: 'Data of second post'},
    {title: 'Thrid post', content: 'Data of third post'}
  ]
  */

  @Input() posts : Post[]= [];


}
