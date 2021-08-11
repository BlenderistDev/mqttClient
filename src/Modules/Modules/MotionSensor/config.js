export default {
  type: 'List',
  name: 'MotionSensor',
  hide: true,
  fields: {
    in_topic: {
      type: 'Input',
      name: 'in_topic',
      width: 4
    },
    in_motion_message: {
      type: 'Input',
      name: 'in_motion_message',
      width: 4
    },
    in_no_motion_message: {
      type: 'Input',
      name: 'in_no_motion_message',
      width: 4
    },
    out_motion_message: {
      type: 'Input',
      name: 'out_motion_message',
      width: 6
    },
    out_no_motion_message: {
      type: 'Input',
      name: 'out_no_motion_message',
      width: 6
    },
    name: {
      type: 'Input',
      name: 'name',
      width: 4
    },
    min_delay: {
      type: 'Number',
      name: 'min_delay',
      width: 4
    },
    max_delay: {
      type: 'Number',
      name: 'max_delay',
      width: 4
    }
  }
}
