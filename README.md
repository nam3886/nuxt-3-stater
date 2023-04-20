# web-app-nuxt-3-stater

## Project setup and run

### Cach 1

```
yarn && yarn dev
```

## Cach 2

```
docker-compose -f docker-compose.dev.yml up -d --build
```

## Function name

```
style: camel
```

## Variable name

```
style: camel | constant (Ex: userName)
variable containing many elements: [key work]List (Ex: driverList)
NOT drivers. There's not much difference when looking at drivers and driver
```

## Component name

```
style: pascal (Ex: UserModel)
```

## Model name

```
style: pascal and has postfix Model (Ex: UserModel)
```

## Interface name

```
style: pascal and has prefix I (Ex: IResource)
```

## Logical Operators

```
use `===` NOT `==`
use `!==` NOT `!=`
```

## Don't use default exports

```
use exporting declarations or export list.
except the component that you want to lazy load (Ex: EmployeePage)
```

## Always use useQuery to call api

```
it reduces the number of duplicate API calls.
https://tanstack.com/query/v4/?from=reactQueryV3&original=https://react-query-v3.tanstack.com/
```

## Always clean your code
