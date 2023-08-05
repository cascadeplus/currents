# Currents

Currents is an effort by [Cascade Algorithmic](https://cascade.plus) to migrate our internal trading
systems to self contained deno services and, in the process, open source as much as we can. At first
this will just contain the portions of various libraries that we've migrated. Right now that means
the very basics of our coinbase exchange api - arguably the most importat part; auth and arbitrary
requests using deno apis.

It is recommended to import the library specifically, as opposed to using the root `mod.ts` but feel
free to use either. Just pay attention to minor version updates because things will change as we
figure out how to structure this in the best way; patch versions should be safe.

## Libraries

- [exchanges/coinbase](exchanges/coinbase/readme.md)

## License

Currents, and every sub library, is provided under the
[Mozilla Public License 2.0](https://mozilla.org/MPL/2.0/).

A copy of the MPLv2 is included [license.md](/license.md) file for convenience.
