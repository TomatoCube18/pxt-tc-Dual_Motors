// TomatoCube Dual Motor blocks

const enum TC_DualMotor {
  //% block="A"
  A = 0,
  //% block="B"
  B = 1,
  //% block="A + B"
  All = 2,
}

const enum TC_DualMotorRotation {
  //% block="forward"
  Forward = 1,
  //% block="backward"
  Backward = -1,
}

//% color=#0fbc11 icon="\u272a" block="TomatoCube"
namespace tomatoCube {
  const motorRotations = [
    TC_DualMotorRotation.Forward,
    TC_DualMotorRotation.Forward,
  ];

  /**
   * Sets the speed of a motor.
   * @param motor motor, eg: TC_DualMotor.A
   * @param speed percentage in the range of -100 to 100, eg: 80
   */
  //% subcategory=Motors
  //% blockId="makerbit_motor_run" block="run motor %motor | at speed %speed \\%"
  //% speed.min=-100
  //% speed.max=100
  //% weight=90
  export function runMotor(motor: TC_DualMotor, speed: number): void {
    if (speed === 0) {
      stopMotor(motor);
      return;
    }

    const absSpeedPercentage = Math.min(Math.abs(speed), 100);
    const analogSpeed = pins.map(absSpeedPercentage, 0, 100, 0, 1023);

    if (motor === TC_DualMotor.A || motor === TC_DualMotor.All) {
      const isClockwise = speed * motorRotations[TC_DualMotor.A] > 0;
      pins.digitalWritePin(isClockwise ? DigitalPin.P12: DigitalPin.P13, 0);
      if (speed === 100) {
        // Avoid PWM whenever possible as only 3 concurrent PWM outputs are available on the microbit
        pins.digitalWritePin(isClockwise ? DigitalPin.P13: DigitalPin.P12, 1);
      } else {
        pins.analogWritePin(isClockwise ? AnalogPin.P13: AnalogPin.P12, analogSpeed);
      }
    }

    basic.pause(50)
    
    if (motor === TC_DualMotor.B || motor === TC_DualMotor.All) {
      const isClockwise = speed * motorRotations[TC_DualMotor.B] > 0;
      pins.digitalWritePin(isClockwise ? DigitalPin.P15: DigitalPin.P16, 0);
      if (speed === 100) {
        // Avoid PWM whenever possible as only 3 concurrent PWM outputs are available on the microbit
        pins.digitalWritePin(isClockwise ? DigitalPin.P16: DigitalPin.P15, 1);
      } else {
        pins.analogWritePin(isClockwise ? AnalogPin.P16: AnalogPin.P15, analogSpeed);
      }
    }
  }

  /**
   * Stops a motor.
   * @param motor motor, eg: TC_DualMotor.A
   */
  //% subcategory=Motors
  //% blockId="makerbit_motor_stop" block="stop motor %motor"
  //% weight=89
  export function stopMotor(motor: TC_DualMotor): void {
    if (motor === TC_DualMotor.A || motor === TC_DualMotor.All) {
      pins.digitalWritePin(DigitalPin.P12, 0);
      pins.digitalWritePin(DigitalPin.P13, 0);
    }

    if (motor === TC_DualMotor.B || motor === TC_DualMotor.All) {
      pins.digitalWritePin(DigitalPin.P15, 0);
      pins.digitalWritePin(DigitalPin.P16, 0);
    }
  }

  /**
   * Apply brakes to the motor.
   * @param motor motor, eg: TC_DualMotor.A
   */
  //% subcategory=Motors
  //% blockId="motorbit_brake_stop" block="brake motor %motor | (experimental)"
  //% weight=88
  export function brakeMotor(motor: TC_DualMotor): void {
    if (motor === TC_DualMotor.A || motor === TC_DualMotor.All) {
      pins.digitalWritePin(DigitalPin.P12, 1);
      pins.digitalWritePin(DigitalPin.P13, 1);
    }

    if (motor === TC_DualMotor.B || motor === TC_DualMotor.All) {
      pins.digitalWritePin(DigitalPin.P15, 1);
      pins.digitalWritePin(DigitalPin.P16, 1);
    }
      
    basic.pause(250);
      
    if (motor === TC_DualMotor.A || motor === TC_DualMotor.All) {
      pins.digitalWritePin(DigitalPin.P12, 0);
      pins.digitalWritePin(DigitalPin.P13, 0);
    }

    if (motor === TC_DualMotor.B || motor === TC_DualMotor.All) {
      pins.digitalWritePin(DigitalPin.P15, 0);
      pins.digitalWritePin(DigitalPin.P16, 0);
    }
  }

  /**
   * Sets the rotation direction of a motor. Use this function at start time to configure your motors without the need to rewire.
   * @param motor motor, eg: TC_DualMotor.A
   * @param rotation rotation of the motor, eg: TC_DualMotorRotation.Forward
   */
  //% subcategory=Motors
  //% blockId=makerbit_motor_set_rotation block="set motor %motor rotation | to %rotation"
  //% weight=87
  export function setMotorRotation(
    motor: TC_DualMotor,
    rotation: TC_DualMotorRotation
  ) {
    if (motor === TC_DualMotor.A || motor === TC_DualMotor.All) {
      motorRotations[TC_DualMotor.A] = rotation;
    }

    if (motor === TC_DualMotor.B || motor === TC_DualMotor.All) {
      motorRotations[TC_DualMotor.B] = rotation;
    }
  }
}
