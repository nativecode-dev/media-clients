# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [2021.0.1](https://git.nativecode.net/nativecode/media-clients/compare/v2021.0.1-next.1...v2021.0.1) (2020-11-09)

**Note:** Version bump only for package @nativecode/radarr





# 2021.0.0 (2020-11-09)


### Bug Fixes

* 🐛 compare-versions was in wrong dep list ([3fbc59a](https://git.nativecode.net/nativecode/media-clients/commits/3fbc59ab44d67853e26f9c18b5bc0e7e162086f9))
* 🐛 lincoln moved to peer dependency ([de352df](https://git.nativecode.net/nativecode/media-clients/commits/de352df476c9ab290789177f1398a7e71f03c825))
* 🐛 manual version bump ([6c2e380](https://git.nativecode.net/nativecode/media-clients/commits/6c2e3806fdd130cd8915b9d844b2605260879516))
* 🐛 remove radarr and sonarr resources export ([db940fc](https://git.nativecode.net/nativecode/media-clients/commits/db940fcbc3bbf131d660410eebe0742fb845a66e))
* 🐛 removing requirement to pass Lincoln ([82e0880](https://git.nativecode.net/nativecode/media-clients/commits/82e088081ae82fd38b566f3c105f5e7b9c54d7c6))
* 🐛 upgrade all dependencies ([b3b9c81](https://git.nativecode.net/nativecode/media-clients/commits/b3b9c81048a163cd8f676feedfe335f245c1d39a))
* 🐛 upgrade dependencies ([192fed4](https://git.nativecode.net/nativecode/media-clients/commits/192fed461414d8da68f6e3f61ef0cb71427e26ab))
* export options ([11c4410](https://git.nativecode.net/nativecode/media-clients/commits/11c4410e5a133448d2e748dc4957b3d138ac592c))
* force update ([77b3343](https://git.nativecode.net/nativecode/media-clients/commits/77b33435d5b1a7a1c76d74ad085cf8c9940b0ec8))
* force version publish ([eeb86d3](https://git.nativecode.net/nativecode/media-clients/commits/eeb86d33c38e6b81719a673c6e46a8284afbf79f))
* force version update ([cd468e5](https://git.nativecode.net/nativecode/media-clients/commits/cd468e5c7e9c4fdc553465865aaaba706d375e12))
* imdb and tvdb now returns a single movie ([f5d4801](https://git.nativecode.net/nativecode/media-clients/commits/f5d4801872aec2a156a6438a57896b26900b6f1a))
* more breaking changes after release ([75ba043](https://git.nativecode.net/nativecode/media-clients/commits/75ba04322fb4d970eae60a6f814165737925fe92))
* profile return type ([0a0487a](https://git.nativecode.net/nativecode/media-clients/commits/0a0487a1f0cdcc12ef5ec657a504a2e9cbb17a17))
* remove console messages ([ac61775](https://git.nativecode.net/nativecode/media-clients/commits/ac61775bf46e1de14646d594700d81842cfc9673))
* update deps ([486782f](https://git.nativecode.net/nativecode/media-clients/commits/486782f2488c8d0365b852d071b168e9a7ecd944))
* upgrade packages ([429e4af](https://git.nativecode.net/nativecode/media-clients/commits/429e4af8658bb27d569726ac2a09f0b25ce19418))


### Features

* 🎸 changed underlying HTTP client to node-fetchPreviously, isomorphic-fetch was used. It has now been replaced bynode-fetch for better compatibility.BREAKING CHANGE: 🧨 replace isomorphic-fetch with node-fetch ([b651d8a](https://git.nativecode.net/nativecode/media-clients/commits/b651d8a97163e693ba2928b84c1cea78c7f19474))
* 🎸 consistent http methods ([6fdafcb](https://git.nativecode.net/nativecode/media-clients/commits/6fdafcb7aa42c04c5b5db0f8c42fc396fd748571))
* 🎸 update package dependencies ([4bcd4a0](https://git.nativecode.net/nativecode/media-clients/commits/4bcd4a0b7200b563d9a889d1259d6754ea6929a7))
* 🎸 upgrade dependencies ([31cfe05](https://git.nativecode.net/nativecode/media-clients/commits/31cfe0507d569dfd3c93ecdffbcb18773e8ffdcf))
* 🎸 upgrade package versions ([dc8b5c2](https://git.nativecode.net/nativecode/media-clients/commits/dc8b5c2eb53335bcec847a39e0476d8657b713a1))
* add additional verbs ([98b051c](https://git.nativecode.net/nativecode/media-clients/commits/98b051c0de4cb4414d0e53c83d9977565c6166c0))
* add api check for radarr and sonarr ([caa4b29](https://git.nativecode.net/nativecode/media-clients/commits/caa4b296a09e239e2a820bcfeaf2b261d18eb322))
* add more commands ([a525fe6](https://git.nativecode.net/nativecode/media-clients/commits/a525fe6bea5ee4b08cd2d4b88f167d431f38da97))
* add queue to radarr ([c455482](https://git.nativecode.net/nativecode/media-clients/commits/c455482cd90646889bcee25ef57fea193be897df))
* adding profiles to radarr ([5ebaa02](https://git.nativecode.net/nativecode/media-clients/commits/5ebaa028fae43b4b3a980bd824110f75cc7e0d06))
* more consolidation ([e782c6f](https://git.nativecode.net/nativecode/media-clients/commits/e782c6f74d48b5772cc132c142b95eb31939a155))
* more tests and version fix ([f447f23](https://git.nativecode.net/nativecode/media-clients/commits/f447f23f33b2e265f43ece1e7bc6059deed810b8))


### BREAKING CHANGES

* removing export of resources
* constructor parameters changed
* all protected _ methods renamed to http_
* All projects that import these libraries must now also import
@nofrills/lincoln





## [4.3.1](https://git.nativecode.net/nativecode/media-clients/compare/@nativecode/radarr@4.3.1-next.1...@nativecode/radarr@4.3.1) (2020-11-08)

**Note:** Version bump only for package @nativecode/radarr





# [4.3.0](https://git.nativecode.net/nativecode/media-clients/compare/@nativecode/radarr@4.3.0-next.1...@nativecode/radarr@4.3.0) (2020-10-30)

**Note:** Version bump only for package @nativecode/radarr





# [4.2.0](https://git.nativecode.net/nativecode/media-clients/compare/@nativecode/radarr@4.2.0-next.7...@nativecode/radarr@4.2.0) (2020-03-11)

**Note:** Version bump only for package @nativecode/radarr





## [4.1.2](https://git.nativecode.net/nativecode/media-clients/compare/@nativecode/radarr@4.1.2-next.1...@nativecode/radarr@4.1.2) (2020-02-15)

**Note:** Version bump only for package @nativecode/radarr





## [4.1.1](https://git.nativecode.net/nativecode/media-clients/compare/@nativecode/radarr@4.1.0...@nativecode/radarr@4.1.1) (2020-02-15)

**Note:** Version bump only for package @nativecode/radarr





# [4.1.0](https://git.nativecode.net/nativecode/media-clients/compare/@nativecode/radarr@4.1.0-next.0...@nativecode/radarr@4.1.0) (2020-02-15)

**Note:** Version bump only for package @nativecode/radarr





# [4.0.0](https://git.nativecode.net/nativecode/media-clients/compare/@nativecode/radarr@3.0.3-next.1...@nativecode/radarr@4.0.0) (2020-01-14)


### Bug Fixes

* 🐛 manual version bump ([6c2e380](https://git.nativecode.net/nativecode/media-clients/commits/6c2e3806fdd130cd8915b9d844b2605260879516))
* 🐛 remove radarr and sonarr resources export ([db940fc](https://git.nativecode.net/nativecode/media-clients/commits/db940fcbc3bbf131d660410eebe0742fb845a66e))


### BREAKING CHANGES

* removing export of resources





## [3.0.3](https://git.nativecode.net/nativecode/media-clients/compare/@nativecode/radarr@3.0.2...@nativecode/radarr@3.0.3) (2020-01-14)

**Note:** Version bump only for package @nativecode/radarr





## [3.0.2](https://git.nativecode.net/nativecode/media-clients/compare/@nativecode/radarr@3.0.2-next.0...@nativecode/radarr@3.0.2) (2020-01-14)

**Note:** Version bump only for package @nativecode/radarr





## [3.0.1](https://git.nativecode.net/nativecode/media-clients/compare/@nativecode/radarr@3.0.0...@nativecode/radarr@3.0.1) (2020-01-14)


### Bug Fixes

* more breaking changes after release ([75ba043](https://git.nativecode.net/nativecode/media-clients/commits/75ba04322fb4d970eae60a6f814165737925fe92))





# [3.0.0](https://git.nativecode.net/nativecode/media-clients/compare/@nativecode/radarr@3.0.0-next.0...@nativecode/radarr@3.0.0) (2020-01-14)

**Note:** Version bump only for package @nativecode/radarr





## [2.1.1](https://git.nativecode.net/nativecode/media-clients/compare/@nativecode/radarr@2.1.1-next.0...@nativecode/radarr@2.1.1) (2020-01-14)

**Note:** Version bump only for package @nativecode/radarr





# [2.1.0](https://git.nativecode.net/nativecode/media-clients/compare/@nativecode/radarr@2.1.0-next.0...@nativecode/radarr@2.1.0) (2020-01-12)

**Note:** Version bump only for package @nativecode/radarr





## [2.0.1](https://git.nativecode.net/nativecode/media-clients/compare/@nativecode/radarr@2.0.1-next.0...@nativecode/radarr@2.0.1) (2020-01-12)

**Note:** Version bump only for package @nativecode/radarr





# [2.0.0](https://git.nativecode.net/nativecode/media-clients/compare/@nativecode/radarr@2.0.0-next.3...@nativecode/radarr@2.0.0) (2020-01-11)

**Note:** Version bump only for package @nativecode/radarr





# [1.2.0](https://git.nativecode.net/nativecode/media-clients/compare/@nativecode/radarr@1.2.0-next.0...@nativecode/radarr@1.2.0) (2020-01-11)

**Note:** Version bump only for package @nativecode/radarr





# [1.1.0](https://git.nativecode.net/nativecode/media-clients/compare/@nativecode/radarr@1.1.0-next.2...@nativecode/radarr@1.1.0) (2020-01-11)

**Note:** Version bump only for package @nativecode/radarr





## [1.0.3](https://git.nativecode.net/nativecode/media-clients/compare/@nativecode/radarr@1.0.3-next.1...@nativecode/radarr@1.0.3) (2020-01-10)


### Bug Fixes

* force version update ([cd468e5](https://git.nativecode.net/nativecode/media-clients/commits/cd468e5c7e9c4fdc553465865aaaba706d375e12))





## [1.0.2](https://git.nativecode.net/nativecode/media-clients/compare/@nativecode/radarr@1.0.2-next.0...@nativecode/radarr@1.0.2) (2019-10-28)

**Note:** Version bump only for package @nativecode/radarr





## [1.0.1](https://git.nativecode.net/nativecode/media-clients/compare/@nativecode/radarr@1.0.0...@nativecode/radarr@1.0.1) (2019-10-28)


### Bug Fixes

* force update ([77b3343](https://git.nativecode.net/nativecode/media-clients/commits/77b33435d5b1a7a1c76d74ad085cf8c9940b0ec8))





# [1.0.0](https://git.nativecode.net/nativecode/media-clients/compare/@nativecode/radarr@1.0.0-next.2...@nativecode/radarr@1.0.0) (2019-10-28)

**Note:** Version bump only for package @nativecode/radarr





# 0.1.0 (2019-06-12)


### Features

* adding history resource ([3381090](https://git.nativecode.net/nativecode/media-clients/commits/3381090))
* adding more interfaces ([339f0f3](https://git.nativecode.net/nativecode/media-clients/commits/339f0f3))
* adding movie lookups ([36cdaee](https://git.nativecode.net/nativecode/media-clients/commits/36cdaee))
* sonarr backups ([64b1ee4](https://git.nativecode.net/nativecode/media-clients/commits/64b1ee4))
