## testeq

A stupid simple test library.

* Basic assertions: `assert`, `equal`, `deepEqual`
* Only supports ES6 modules in `tests/` folder
* Outputs TAP compliant test results
* Tries to encourage Functional Programming
* Avoids exception based testing
* A splash of colour for the red/green brigade
* No dependencies
* Should work with any of the reporters from (https://github.com/substack/tape)
  Just be sure to add `--no-color`
* Follows Standard JS style guide

## Caveats

* It cheats a bit by using JSON.stringify to easily do deep comparisons
* Output is sent to STDOUT once all tests have run
  but I intend to scale this as needed
* I'm still learning FP and realise that some parts are far from it right now

## Motivation

* Limited API to force better testing practices
* Only support ES6 modules to keep it minimal
* It's designed not to run with module bundlers
  I find it (now) an unnecessary step in the test phase

## TODO

* Handle async
* Other stuff as needed
* May support TAP version 13 at some point

## Usage

Run all .mjs module files under `tests/` folder:

    bin/testeq [--no-color]

Specify `--no-color` if you get garbled output or want to plug it into a TAP parser.

#### all_sorts_test.mjs

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
