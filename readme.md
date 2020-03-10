### Node-NAPI Benchmark

This project measures performance differences between `NAPI` and `NODE.JS` implementations.

I use the `centos8 container`  of `docker` to proceed in the same environment.

---

### Env

Hardware : 

- **CPU** : AMD® Ryzen 5 2400g with radeon vega graphics × 8
- **RAM** : 16 GB


Operating System :

- **HOST**   : centos 8 (x64)
- **Docker Container** : centos 8

Node version : 

- **NODE** : 10.19.0
- **NAPI** : 5

---

### Setting up your environment

There are two ways.

- Pull out already built Docker image. (recommended)

- Manually install the necessary tools.

##### From Docker image :

1. Install docker.

2. Download the pre-built image.

```shell
$ docker pull myaerocode/centos-node-napi:8 
```
3. Run container using image.

```shell
$ docker run --name hello --net host -it myaerocode/centos-node-napi:8
```

##### Manually install :

Install the programs below.

Build Tools :

- gcc / g++ / cmake
- python3
- node

Version Control :

- git

Node Packages (Globally) :

- typescript
- ts-node
- tsconfig-paths
- node-gyp

---

### How to execute it?

1. Clone this repository.

```shell
$ git clone https://github.com/MyAeroCode/node-napi-benchmark
```

2. Enter the workspace you want.

```shell
$ cd 1-1.array-write
```

3. Build workspace then run.

```shell
$ npm install
$ npm run build
$ npm run start
```

---

### Related Links

- <a href="https://github.com/nodejs/node-addon-api/tree/master/doc" target="_blank">NAPI Document</a>