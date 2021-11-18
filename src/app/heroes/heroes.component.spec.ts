import { of } from "rxjs";
import { HeroesComponent } from "./heroes.component"

describe('HeroesComponent', () => {
  let component: HeroesComponent;
  let HEROES;
  let mockHeroService;

  beforeEach(() => {
    HEROES = [
      {id:1, name: 'SpiderDude', strength: 8},
      {id:2, name: 'Wonderful Woman', strength: 24},
      {id:3, name: 'SuperDude', strength: 55},
    ];

    mockHeroService = {
      getHeroes: jest.fn(),
      addHero: jest.fn(),
      deleteHero: jest.fn(),
    }

    component = new HeroesComponent(mockHeroService);
  })

  describe('delete', () => {

    it('should remove the indicated hero from the heroes list', () => {
      // ARRANGE
      mockHeroService.deleteHero.mockReturnValue(of(true));
      component.heroes = HEROES;

      // ACT
      component.delete(HEROES[2]);

      // ASSERT that the array has the correct length of heroes
      expect(component.heroes.length).toBe(2);
      // ASSERT the indicated hero was removed
      expect(component.heroes).toEqual([HEROES[0], HEROES[1]]);
    })

    it('should call deleteHero with the indicated hero', () => {
      mockHeroService.deleteHero.mockReturnValue(of(true));
      component.heroes = HEROES;

      component.delete(HEROES[2]);

      expect(mockHeroService.deleteHero).toHaveBeenCalledWith(HEROES[2]);
    })
  })
})
