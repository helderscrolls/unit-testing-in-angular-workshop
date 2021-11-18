import { Component, CUSTOM_ELEMENTS_SCHEMA, Input, NO_ERRORS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing"
import { By } from "@angular/platform-browser";
import { of } from "rxjs";
import { Hero } from "../hero";
import { HeroService } from "../hero.service";
import { HeroesComponent } from "./heroes.component"

describe('HeroesComponent (shallow test)', () => {
  let fixture: ComponentFixture<HeroesComponent>;
  let mockHeroService;
  let HEROES;

  @Component({
    selector: 'app-hero',
    template: '<div></div>',
  })
  class MockHeroComponent {
    @Input() hero: Hero;
  }

  beforeEach(() => {
    HEROES = [
      {id: 1, name: 'SpiderDude', strength: 8},
      {id: 2, name: 'Wonderful Woman', strength: 24},
      {id: 3, name: 'SuperDude', strength: 55},
    ];

    mockHeroService = {
      getHeroes: jest.fn(),
      addHero: jest.fn(),
      deleteHero: jest.fn(),
    }

    TestBed.configureTestingModule({
      declarations: [
        HeroesComponent,
        MockHeroComponent,
      ],
      providers: [
        {
          provide: HeroService,
          useValue: mockHeroService
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    fixture = TestBed.createComponent(HeroesComponent);
  });

  it ('should set heroes correctly from the service', () => {
    mockHeroService.getHeroes.mockReturnValue(of(HEROES));
    fixture.detectChanges();

    expect(fixture.componentInstance.heroes.length).toBe(3);
  })

  it ('should create one li for each hero', () => {
    mockHeroService.getHeroes.mockReturnValue(of(HEROES));
    fixture.detectChanges();

    expect(fixture.debugElement.queryAll(By.css('li')).length).toBe(3);
  })
})
