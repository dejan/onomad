import { describe, it, expect } from "bun:test";

import { timeago } from "./onomad";

function secondsAgo(seconds: number): Date {
  return new Date(Date.now() - seconds * 1000);
}

function minutesAgo(minutes: number): Date {
  return secondsAgo(60 * minutes);
}

function hoursAgo(hours: number): Date {
  return minutesAgo(60 * hours);
}

function daysAgo(days: number): Date {
  return hoursAgo(24 * days);
}

function yearsAgo(years: number): Date {
  return daysAgo(365 * years);
}

const examples: [Date, string][] = [
  [secondsAgo(30), "malopre"],
  [secondsAgo(60), "pre minut"],
  [minutesAgo(2), "pre 2 minuta"],
  [minutesAgo(3), "pre 3 minuta"],
  [minutesAgo(4), "pre 4 minuta"],
  [minutesAgo(5), "pre 5 minuta"],
  [minutesAgo(7), "pre 7 minuta"],
  [minutesAgo(10), "pre 10 minuta"],
  [minutesAgo(20), "pre 20 minuta"],
  [minutesAgo(30), "pre pola sata"],
  [minutesAgo(60), "pre sat vremena"],
  [hoursAgo(2), "pre 2 sata"],
  [hoursAgo(3), "pre 3 sata"],
  [hoursAgo(5), "pre 5 sati"],
  [hoursAgo(12), "pre 12 sati"],
  [hoursAgo(18), "pre 18 sati"],
  [hoursAgo(20), "juče"],
  [hoursAgo(24), "juče"],
  [hoursAgo(36), "juče"],
  [hoursAgo(48), "pre 2 dana"],
  [daysAgo(3), "pre 3 dana"],
  [daysAgo(7), "pre nedelju dana"],
  [daysAgo(8), "pre nedelju dana"],
  [daysAgo(10), "pre nedelju dana"],
  [daysAgo(14), "pre 2 nedelje"],
  [daysAgo(21), "pre 3 nedelje"],
  [daysAgo(28), "pre mesec dana"],
  [daysAgo(40), "pre mesec dana"],
  [daysAgo(60), "pre 2 meseca"],
  [daysAgo(90), "pre 3 meseca"],
  [daysAgo(300), "pre godinu dana"],
  [daysAgo(330), "pre godinu dana"],
  [daysAgo(500), "pre godinu dana"],
  [daysAgo(700), "pre 2 godine"],
  [daysAgo(1100), "pre 3 godine"],
  [yearsAgo(4), "pre 4 godine"],
  [yearsAgo(5), "pre 5 godina"],
  [yearsAgo(10), "pre 10 godina"],
  [yearsAgo(16), "pre 16 godina"],
];

describe("timeago", () => {
  examples.forEach(([date, expected]) => {
    it(`${date} should return ${expected}`, () => {
      expect(timeago(date)).toBe(expected);
    });
  });
});
