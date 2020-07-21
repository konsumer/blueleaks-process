# blueleaks-process

This will help you process [#blueleaks](magnet:?xt=urn:btih:8cf92b7cd3f022fa5478b84963e89c1dd0af090f&dn=BlueLeaks&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969%2Fannounce&tr=udp%3A%2F%2F9.rarbg.to%3A2920%2Fannounce&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969%2Fannounce). It doesn't include any of the data, just code to process it. The goal is to be able to easily find what you are looking for, in all the leaked files.

You will need docker installed.

It will extract text from images, PDFs, text-files and images.

> **Unrelated sidenote**: Github doesn't render `magnet` links when it parses markdown, but it's still [in the source](https://raw.githubusercontent.com/konsumer/blueleaks-process/master/README.md).

## usage

* Download [blueleaks](magnet:?xt=urn:btih:8cf92b7cd3f022fa5478b84963e89c1dd0af090f&dn=BlueLeaks&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969%2Fannounce&tr=udp%3A%2F%2F9.rarbg.to%3A2920%2Fannounce&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969%2Fannounce) to `BlueLeaks/` in repo dir.
* Run `mkdir -p data/nodes` so it gets created with correct permissions.
* Run `docker-compose up -d`
* Wait a really long time (you can see what it's doing with `docker-compose logs -f`)
* Explore the data in [kibana](http://localhost:5601/)

Your data will be created in `data/`

### data analysis

Eventually I will make some sort of frontend for it, and create some good example queries here, but for now, just play around with it in [kibana query console](http://localhost:5601/app/kibana#/dev_tools/console).

To find everything in the current `blueleaks`, do this:

```json
{
 "query": {
        "match" : {
            "_index" : {
                "query" : "blueleaks"
            }
        }
    }
}
```

### adding more leaks

You can copy the `fscrawler` section from docker-compose to index another leak in the same fashion:

```yml
  fscrawler-anotherleak:
    image: toto1310/fscrawler:2.7-SNAPSHOT
    restart: unless-stopped
    volumes:
      - ${PWD}/config/fscrawler:/root/.fscrawler
      - ${PWD}/anotherleak:/tmp/es
    networks: 
      - internal_network
    command: fscrawler anotherleak
    depends_on:
      - elasticsearch
```