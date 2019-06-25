import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class CommentService {

  public AUTH_SERVER: string = 'http://192.168.0.155:4000';

  constructor(private http: HttpClient) { 
  }
  getAll() {
    return this.http.get<Comment[]>(`${this.AUTH_SERVER}/comments`);
  }

  getById(id: number) {
    return this.http.get(`${this.AUTH_SERVER}/comments/` + id);
  }

  update(comment: Comment) {
    return this.http.put(`${this.AUTH_SERVER}/comments/` + comment, comment);
  }

  delete(id: number) {
    return this.http.delete(`${this.AUTH_SERVER}/comments/` + id);
  }

  create(comment: Comment) {
    return this.http.post(`${this.AUTH_SERVER}/comments/`, comment);
  }
}
