var PIXI = require("pixi.js");

var Night = function() {
  PIXI.AbstractFilter.call(this);

  this.passes = [this];

  // set the uniforms
  this.uniforms = {
    lights: { type: '4fv', value: [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0] },
    torchColorMapping: { type: 'mat3', value: [
      1.1, 0.0, 0.2,
      0.0, 0.8, 0.1,
      0.0, 0.0, 0.5
    ] },
    nightColorMapping: { type: 'mat3', value: [
      0.2, 0.0, 0.1,
      0.0, 0.3, 0.1,
      0.0, 0.0, 0.6
    ] },
    night: { type: '1f', value: 1 },
    constantAttenuation: { type: '1f', value: 1.5 },
    linearAttenuation: { type: '1f', value: 3 },
    quadraticAttenuation: { type: '1f', value: 5 }
  };

  this.fragmentSrc = [
    'precision mediump float;',
    'varying vec2 vTextureCoord;',
    'varying vec4 vColor;',
    'uniform sampler2D uSampler;',

    'uniform float night;',
    'uniform vec4 lights[4];',
    'uniform mat3 nightColorMapping;',
    'uniform mat3 torchColorMapping;',
    'uniform float constantAttenuation;',
    'uniform float linearAttenuation;',
    'uniform float quadraticAttenuation;',

    'void main(void) {',
    '   vec4 color = texture2D(uSampler, vTextureCoord);',
    '   vec3 c = color.rgb;',
    '   float l = 0.0;',
    '   for (int i=0; i<4; ++i) {',
    '     float dist = distance(gl_FragCoord.xy, lights[i].xy) / lights[i].z;',
    '     float attenuation = 1.0 / (constantAttenuation + linearAttenuation * dist + quadraticAttenuation * dist * dist);',
    '     l += lights[i].w * attenuation;',
    '   }',
    '   l = min(2.0, l);',
    '   vec3 lightColor = l * (c * torchColorMapping);',
    '   vec3 ambiantColor = (c * nightColorMapping);',
    '   gl_FragColor = vec4(lightColor + ambiantColor, color.a);',
    '}'
  ];
};

Night.prototype = Object.create(PIXI.AbstractFilter.prototype);
Night.prototype.constructor = Night;

Object.defineProperty(Night.prototype, 'lights', {
  get: function() {
    return this.uniforms.lights.value;
  },
  set: function(value) {
    this.uniforms.lights.value = value;
  }
});
Object.defineProperty(Night.prototype, 'torchColorMapping', {
  get: function() {
    return this.uniforms.torchColorMapping.value;
  },
  set: function(value) {
    this.uniforms.torchColorMapping.value = value;
  }
});
Object.defineProperty(Night.prototype, 'nightColorMapping', {
  get: function() {
    return this.uniforms.nightColorMapping.value;
  },
  set: function(value) {
    this.uniforms.nightColorMapping.value = value;
  }
});
Object.defineProperty(Night.prototype, 'night', {
  get: function() {
    return this.uniforms.night.value;
  },
  set: function(value) {
    this.uniforms.night.value = value;
  }
});
Object.defineProperty(Night.prototype, 'linearAttenuation', {
  get: function() {
    return this.uniforms.linearAttenuation.value;
  },
  set: function(value) {
    this.uniforms.linearAttenuation.value = value;
  }
});
Object.defineProperty(Night.prototype, 'quadraticAttenuation', {
  get: function() {
    return this.uniforms.quadraticAttenuation.value;
  },
  set: function(value) {
    this.uniforms.quadraticAttenuation.value = value;
  }
});
Object.defineProperty(Night.prototype, 'constantAttenuation', {
  get: function() {
    return this.uniforms.constantAttenuation.value;
  },
  set: function(value) {
    this.uniforms.constantAttenuation.value = value;
  }
});

module.exports = Night;
