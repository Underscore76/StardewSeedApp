import enum
from typing import Optional
from pydantic import BaseModel, Field


class Weather(str, enum.Enum):
    Sunny = "Sunny"
    Rain = "Rain"
    Storm = "Storm"
    Snow = "Snow"
    GreenRain = "GreenRain"


class WeatherRequirement(BaseModel):
    weather: Weather
    day: int


class NightEvent(str, enum.Enum):
    NONE = "None"
    Fairy = "Fairy"
    Witch = "Witch"
    Meteor = "Meteor"
    StoneOwl = "StoneOwl"
    StrangeCapsule = "StrangeCapsule"
    WindStorm = "WindStorm"


class NightEventRequirement(BaseModel):
    event: NightEvent
    day: int


class ItemQuestRequirement(BaseModel):
    day: int
    person: str
    id: Optional[str] = None
    people_known: Optional[list[str]] = None
    has_furnace: Optional[bool] = False
    has_desert: Optional[bool] = False
    mine_level: Optional[int] = 0
    has_socialize_quest: Optional[bool] = True
    cooking_recipes_known: Optional[int] = 1


class JobRequirements(BaseModel):
    legacy_rng: bool
    start_seed: int
    end_seed: int
    weather: list[WeatherRequirement] = Field(default_factory=list)
    night_event: list[NightEventRequirement] = Field(default_factory=list)
    item_quest: list[ItemQuestRequirement] = Field(default_factory=list)
