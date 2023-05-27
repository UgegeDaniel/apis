
## Required Paramters

| Parameter   |Description|
|------------|-----------|
|  year      | Year of examination are under  |
|  subject   | Subject of examination   |
|  subjectId | subject id corresponding to subject in subjects table in database   |
|  token     | Required for the remote api [Aloc Endpoints By Mesonrale Ope](https://github.com/Seunope/aloc-endpoints)|
|  remote    | If not provided a file with the name [subject]-[year].json will be fetched from else an error will be throw. If provided questions will fetched from [Aloc Endpoints By Mesonrale Ope](https://github.com/Seunope/aloc-endpoints)|


```sh
node dist/cli/index.js token=example-token subject=english subjectId=example-id year=example-year remote=true
```
