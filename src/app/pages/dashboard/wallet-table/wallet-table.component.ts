import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { TranslateCompiler } from '@ngx-translate/core';
import { CategoriesType } from 'src/app/commons/models/categories';
import { CommentType } from 'src/app/commons/models/comment';
import { AlertComponent } from 'src/app/reusables/alert/alert.component';
import { CategoriesService } from 'src/app/services/htpp-services/categories.service';
import { CommentsService } from 'src/app/services/htpp-services/comments.service';

@Component({
  selector: 'app-wallet-table',
  templateUrl: './wallet-table.component.html',
  styleUrls: ['./wallet-table.component.scss']
})
export class WalletTableComponent implements OnInit {

  @ViewChild('alert') alert!: AlertComponent;

  @Input()
  comments!: CommentType[];

  @Input()
  title!: string;

  @Output()
  deleteAction = new EventEmitter<boolean>()

  constructor(private commentService: CommentsService, private translate: TranslateCompiler, private categoriesService: CategoriesService) { }

 getCategoryName(id: number){ 
  let categ = "";
 
  switch(Number(id)){
    case 1: {
     categ = "élelmiszer"; break;
    }
    case 2: {
      categ = "közlekedés"; break;
    }
    case 3: {
      categ = "vásárlás"; break;
    }
    case 4: {
      categ = "sport"; break;
    }
    case 5: {
      categ = "egészség"; break;
    }
    case 6: {
      categ = "ajándék"; break;
    }
    case 7: {
      categ = "fizetés"; break;
    }
    case 8: {
      categ = "egyéb"; break;
    }
    case 9: {
      categ = "egyéb"; break;
    }
    case 10: {
      categ = "háztartás"; break;
    }
  }
    return categ;
  }

  ngOnInit(): void {
  }

}
