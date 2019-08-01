import { Component, OnInit } from '@angular/core';
import { CommentService } from '../_services/comment_service';
import { first } from 'rxjs/operators';
import { AlertService, UserService } from '../_services';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-forum-page',
  templateUrl: './forum-page.component.html',
  styleUrls: ['./forum-page.component.scss']
})
export class forumPageComponent implements OnInit {

  comments: Comment[] = [];
  loading = false;
  commentForm: FormGroup;

  private identity = this._userService.getIdentity();

  constructor(private _commentService: CommentService,
              private alertService: AlertService,
              private formBuilder: FormBuilder,
              private _userService: UserService) { 
                
  }

  ngOnInit() {
    this.loadAllComments();
    this.commentForm = this.formBuilder.group({
      title: ['', Validators.required],
      content: ['', Validators.required]
    });
  }

  private loadAllComments() {
    this._commentService.getAll()
          .pipe(first())
          .subscribe(
              comments => { 
        return this.comments = comments; 
    },
    error => {
      this.alertService.error(error);
    });
  }


  // convenience getter for easy access to form fields
  get f() { return this.commentForm.controls; }

  onSubmit() {
      // stop here if form is invalid
      if(this.identity){
        this.commentForm.value.commentBy = this.identity.username;
      }else{
        this.commentForm.value.commentBy = 'Unregistered User';
      }
      this.loading = true;
      this._commentService.create(this.commentForm.value)
          .pipe(first())
          .subscribe(
              data => {
                  this.loading = false;
                  this.loadAllComments();
              },
              error => {
                  this.alertService.error(error);
                  this.loading = false;
              });
     
  }

  deleteComment(comment){
    if(confirm("Estas seguro de eliminar este comentario?")){
      this._commentService.delete(comment)
          .subscribe(
            data => {
                this.loading = false;
                this.loadAllComments();
            },
            error => {
                this.alertService.error(error);
                this.loading = false;
            });
    }
    else{

    }
  }




}
