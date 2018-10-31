import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable()
export class UtilService {
  private isLoading = false;
  isLoadingChange = new Subject<boolean>();

  setIsLoading(status: boolean): void {
    this.isLoading = status;
    this.isLoadingChange.next(status);
  }

  constructor() {
  }
}
