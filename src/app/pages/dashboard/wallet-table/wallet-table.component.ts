import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { TranslateCompiler } from '@ngx-translate/core';
import { CommentType } from 'src/app/commons/models/comment';
import { AlertComponent } from 'src/app/reusables/alert/alert.component';
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

  constructor(private commentService: CommentsService, private translate: TranslateCompiler) { }

  ngOnInit(): void {
  }

}
