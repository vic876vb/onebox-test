import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NgModule } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';

@NgModule({
  imports: [NoopAnimationsModule, HttpClientTestingModule],
  providers: [provideRouter([])]
})
export class AppTestingModule {}
