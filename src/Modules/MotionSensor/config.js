export default {
  type: 'List',
  name: 'MotionSensor',
  fields: {
    in_topic: {
      type: 'String',
      name: 'in_topic'
    },
    in_motion_message: {
      type: 'String',
      name: 'in_motion_message'
    },
    in_no_motion_message: {
      type: 'String',
      name: 'in_no_motion_message'
    },
    name: {
      type: 'String',
      name: 'name'
    },
    out_motion_message: {
      type: 'String',
      name: 'out_motion_message'
    },
    out_no_motion_message: {
      type: 'String',
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