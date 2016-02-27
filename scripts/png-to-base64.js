#!/usr/bin/env node

'use strict'

const path = require('path')
const fs = require('fs')

const dstpath = path.join(__dirname, '..', 'base64emoticons.json')
const imgdir = path.join(__dirname, '..', 'images')

const images = {}

fs.readdirSync(imgdir)
  .map((name, i) => {
    if (path.extname(name) === '.png') {
      const data = fs.readFileSync(path.join(imgdir, name), { encoding: 'binary' })
      const base64 = (new Buffer(data, 'binary')).toString('base64')
      images[name.replace('.png', '')] = 'data:image/png;base64,' + base64
    }
  })

fs.writeFileSync(dstpath, JSON.stringify(images), { encoding: 'utf8' })
