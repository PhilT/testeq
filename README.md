## testeq

A stupid simple test library, with only 2 assertions. `assert` is really
there just to support `equal`.

* Only supports ES6 modules in `tests/` folder
* Outputs TAP compliant test results
* Tries to encourage Functional Programming
* Avoids exception based testing

## Motivation

Limited API to force better testing practices.

## TODO

* Handle async
* colour 'ok', 'not ok'
* Add more details string compare
* Other stuff as needed

## Usage

Run all .mjs module files under `tests/` folder:

    bin/testeq

#### all_sorts_test.js

    import { assert, equal } from '../index.mjs'

    export default () => {
      return {
        'the truth is out there': () => {
          return assert(true)
        },

        'all things being equal': () => {
          return equal('matches', 'matches')
        }
      }
    }

#### outputs

    1..2
    ok 1 the truth is out there
    ok 2 all things being equal
