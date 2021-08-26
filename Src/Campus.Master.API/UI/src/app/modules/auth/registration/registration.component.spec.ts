import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { RegistrationComponent } from './registration.component';
import { RouterTestingModule } from '@angular/router/testing';
import { FirstErrorPipe } from '../../../shared/pipes/first-error.pipe';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { RegistrationState } from '../store/auth.reducer';

describe('RegistrationComponent', () => {
    let component: RegistrationComponent;
    let fixture: ComponentFixture<RegistrationComponent>;

    let formBuilderStub: Partial<FormBuilder>;
    let translateServiceStub: Partial<TranslateService>;
    let mockStore: MockStore;

    const initialState = {
        isSpinnerOn: false
    } as RegistrationState

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [RegistrationComponent, FirstErrorPipe],
            imports: [TranslateModule, ReactiveFormsModule, RouterTestingModule],
            providers: [
                { provide: FormBuilder, useValue: formBuilderStub },
                provideMockStore({ initialState }),
                { provide: TranslateService, useValue: translateServiceStub },
            ]
        });

        fixture = TestBed.createComponent(RegistrationComponent);
        component = fixture.componentInstance;
        
        mockStore = TestBed.inject(MockStore);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
