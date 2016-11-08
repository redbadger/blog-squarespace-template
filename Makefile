SHELL:=/bin/bash

NBIN=./node_modules/.bin
WEBPACK=$(NBIN)/webpack --bail

help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

dist/styles.css:
	./node_modules/.bin/elm-css src/Stylesheets.elm

