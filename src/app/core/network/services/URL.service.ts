import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class URLService {

  constructor(@Inject(DOCUMENT) private document: any) { }

  getDomain() {
    let host = `${this.document.location.protocol}//${this.document.location.hostname}`;
    let domain = this.document.location.port ? `${host}:${this.document.location.port}` : `${host}`;
    return domain;
  }

  changeURL(url: string) {
    this.document.location.href = url;
  }

}
