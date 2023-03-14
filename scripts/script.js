const Scene = require('Scene')
const D = require('Diagnostics')
const R = require('Reactive')
const Patches = require('Patches')

Promise.all([
  Scene.root.findFirst('Focal Distance', {recursive: true}),
  Scene.root.findFirst('planeTracker0', {recursive: true}),
]).then(([fd, pt]) => {

  let pos = R.vector(fd.worldTransform.position.x, fd.worldTransform.position.y, fd.worldTransform.position.z)//.sub(pt.worldTransform.position)
  // fix coordinates on device
  // pos = R.vector(pos.x, pos.z, pos.y)
  Patches.inputs.setVector('focalDistance', pos)
  
  const fdRot = R.vector(fd.worldTransform.rotationX, fd.worldTransform.rotationY, fd.worldTransform.rotationZ)
  const ptRot = R.vector(pt.worldTransform.rotationX, pt.worldTransform.rotationY, pt.worldTransform.rotationZ)
  const rot = fdRot//.sub(ptRot)
  Patches.inputs.setVector('focalRotation', rot)

}).catch(err => D.log(err))
