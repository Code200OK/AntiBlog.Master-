import { ComponentFixture, TestBed } from "@angular/core/testing"
import { ReactiveFormsModule } from "@angular/forms";
import { By } from "@angular/platform-browser";
import { MemoizedSelector } from "@ngrx/store";
import { MockStore, provideMockStore } from "@ngrx/store/testing";
import { selectSignInSpinnerState } from "../store";
import { AuthState } from "../store/auth.reducer";
import { SingInComponent } from './sing-in.component';
import { TranslateStubsModule } from '../mocks/translate-stubs.module';
import { spinnerClass } from "./../../../shared/spinner/spinner-class-names";
import { AuthActions } from "../store/actions";

describe('SingInComponent', () => {
    let component: SingInComponent;
    let fixture: ComponentFixture<SingInComponent>;

    let store: MockStore;
    let isSignInSpinnerOnMock: MemoizedSelector<AuthState, boolean>;

    const initialState = {
        isSignInSpinnerOn: false
    } as AuthState

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [SingInComponent],
            imports: [TranslateStubsModule, ReactiveFormsModule],
            providers: [provideMockStore({ initialState }),],
        }).compileComponents();

        store = TestBed.inject(MockStore);
        fixture = TestBed.createComponent(SingInComponent);
        component = fixture.componentInstance;

        isSignInSpinnerOnMock = store.overrideSelector(selectSignInSpinnerState, false)

        store.dispatch = jest.fn();
    });

    afterEach(() => {
        TestBed.inject(MockStore)?.resetSelectors();
    });

    it('should dispatch signIn action when submit called', () => {
        // TODO: can we interpolate method names like :
        // ${submit.name} to keep tests sync with source code  ?
        // arrange
        const email = 'email';
        const password = 'password';
        // act        
        component.submit(email, password);
        // assert
        expect(store.dispatch).toHaveBeenCalledWith(
            AuthActions.signIn({ signInModel: { email, password } }));
    })

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    test.each([
        { isSpinnerOn: true, numberOfSpinners: 1 },
        { isSpinnerOn: false, numberOfSpinners: 0 }])
        ('should spin or not when isSpinnerOn true or false ',
            ({ isSpinnerOn, numberOfSpinners }) => {
                // arrange                
                isSignInSpinnerOnMock.setResult(isSpinnerOn);
                // act
                store.refreshState();
                fixture.detectChanges();
                // assert
                expect(
                    fixture.debugElement.queryAll(By.css(spinnerClass)).length)
                    .toBe(numberOfSpinners);
            });
    // TODO: 
    // 1) validate sign-in action dispatch    
})
