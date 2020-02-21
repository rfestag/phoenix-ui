# phoenix-ui

This is a monorepo for the Phoenix UI project. 

# Adding a new package

```
lerna create @phoenix-ui/packagename
```

Copy the scripts section from an existing package to your new package

# Managing dependencies

## Adding a dependency to all packages

Often times, you may want to add a dependency to everything. 

```
# As a dependency
lerna add <package>

# As a dev dependency
lerna add --dev <package>

# As a peer
lerna add --peer <package>

# To only one package
lerna add --scope=demo <package>
```

## Adding a depenency to the root

Sometimes you want to add a package only to the root (such as with husky)

```
yarn add -W <package>
```

# TODO

- [x] Drawing / User Layer management
- [x] Zoom in/out control
- [ ] Layer Manager (Base and overlays)
- [ ] Edit shape toolbox (allow user to type in changes)
- [ ] Feature measurements (length, area, etc)
- [ ] Additional shapes (rings, sectors, buffers)
- [ ] Allow user to insert holes
- [ ] Shape search (OSM)
- [ ] What's here component
- [ ] Preferences (load/save)
- [ ] Theme Selection
- [ ] User control over how lat/lons displayed (DMS, DD, MGRS, etc)
- [ ] Nested Menu Components
