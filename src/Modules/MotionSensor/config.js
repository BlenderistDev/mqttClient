export default {
  type: 'List',
  name: 'MotionSensor',
  fields: {
    in_topic: {
      type: 'Input',
      name: 'in_topic'
    },
    in_motion_message: {
      type: 'Input',
      name: 'in_motion_message'
    },
    in_no_motion_message: {
      type: 'Input',
      name: 'in_no_motion_message'
    },
    name: {
      type: 'Input',
      name: 'name'
    },
    out_motion_message: {
      type: 'Input',
      name: 'out_motion_message'
    },
    out_no_motion_message: {
      type: 'Input',
      name: 'out_no_motion_message'
    },
    min_delay: {
      type: 'Number',
      name: 'min_delay'
    },
    max_delay: {
      type: 'Number',
      name: 'max_delay'
    }
  }
}
