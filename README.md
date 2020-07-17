# blueleaks-process

This will help you process [#blueleaks](magnet:?xt=urn:btih:8cf92b7cd3f022fa5478b84963e89c1dd0af090f&dn=BlueLeaks&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969%2Fannounce&tr=udp%3A%2F%2F9.rarbg.to%3A2920%2Fannounce&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969%2Fannounce). It doesn't include any of the data, just code to process it.

You will need nodejs installed.

> **Unrelated sidenote**: Github doesn't render `magnet` links when it parses markdown, but it's still in the source.

## install

```sh
git clone -–depth 1 https://github.com/konsumer/blueleaks-process.git
cd blueleaks-process
npm i
```

## usage

* Download [blueleaks](magnet:?xt=urn:btih:8cf92b7cd3f022fa5478b84963e89c1dd0af090f&dn=BlueLeaks&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969%2Fannounce&tr=udp%3A%2F%2F9.rarbg.to%3A2920%2Fannounce&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969%2Fannounce) to `blueleaks/` in repo dir, and extract all the zips you want to process.
* Run `./extract_text` to extract a bunch of text-files to `output/`
* Run `./extract_pii` to extract personally identifiable information from text-files in `output/` to an sqlite database

```
Usage: ./extract_text -i [input] -o [output]

Options:
  -h, --help     Show help                                          [boolean]
  --input, -i    Input directory            [string] [default: "./blueleaks"]
  --output, -o   Output directory              [string] [default: "./output"]
  -v, --version  Show version number                                [boolean]

Examples:
  ./extract_text  Find text in ./blueleaks and output to ./output
```