# blueleaks-process

This will help you process [#blueleaks](magnet:?xt=urn:btih:8cf92b7cd3f022fa5478b84963e89c1dd0af090f&dn=BlueLeaks&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969%2Fannounce&tr=udp%3A%2F%2F9.rarbg.to%3A2920%2Fannounce&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969%2Fannounce). It doesn't include any of the data, just code to process it.

You will need docker installed, and `make` makes it easier to use.

It will extract text from images, PDFs, copy CSVs & code, and text, and convert excel files to CSV.

The idea is to make text files out of everything for searching or whatever.

> **Unrelated sidenote**: Github doesn't render `magnet` links when it parses markdown, but it's still in the source.

## usage

* Download [blueleaks](magnet:?xt=urn:btih:8cf92b7cd3f022fa5478b84963e89c1dd0af090f&dn=BlueLeaks&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969%2Fannounce&tr=udp%3A%2F%2F9.rarbg.to%3A2920%2Fannounce&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969%2Fannounce) to `blueleaks/` in repo dir, and extract all the zips you want to process.

### make

If you have docker installed, you only need the [Makefile](Makefile). Run `make` then one of these targets:

```
help                           Show this help
build                          build docker container
publish                        publish docker container

text                           extract text from files in blueleaks dir
pii                            extract PII from files in output dir into sqlite
```