// @flow

import React, { Component } from 'react';

type Props = {
  themeVars: Object,
  themeKey: string,
};

export default class ThemeThumbnail extends Component<Props> {
  render() {
    const { themeVars, themeKey } = this.props;

    const gradientKey = `topbar-gradient-${themeKey}`;
    return (<div>
      <svg width="100%" height="360" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id={gradientKey}>
            <stop stopColor={themeVars['--theme-topbar-background-color-gradient-start']} />
            <stop offset="1" stopColor={themeVars['--theme-topbar-background-color-gradient-end']} />
          </linearGradient>
        </defs>
        <g>
          <rect fill={themeVars['--theme-main-body-background-color']} id="canvas_background" height="362" width="100%" y="0" x="0" />
          <g display="none" overflow="visible" y="0" x="0" height="100%" width="100%" id="canvasGrid">
            <rect fill="url(#gridpattern)" strokeWidth="0" y="0" x="0" height="100%" width="100%" />
          </g>
        </g>
        <g>
          <rect x="0" id="svg_1" height="61" width="100%" y="0" strokeWidth="0" fill={`url(#${gradientKey}`} />
          <g stroke="null" id="svg_8">
            <path stroke="null" id="svg_7" d="m47.127067,41.432489l-3.983135,2.765304c-9.784172,-6.760905 -19.539089,-13.501905 -29.333916,-20.270652c-0.005328,-0.039107 -0.008143,-0.078716 -0.011762,-0.118224l0,-1.807847c0.002915,-0.585593 0.00181,-1.171487 0,-1.75718l0,-1.842732c11.139931,7.698155 22.213211,15.350166 33.328814,23.031332zm-8.186434,-26.160155c-1.770752,1.213308 -3.558091,2.403091 -5.328541,3.617002c-0.239565,0.163162 -0.403431,0.167183 -0.644001,0c-2.188759,-1.522641 -4.389582,-3.026986 -6.580653,-4.546511c-2.307788,-1.599849 -4.608136,-3.210857 -6.913612,-4.815531c-1.089252,-0.758305 -2.179108,-1.515705 -3.268562,-2.273607l-7.912085,0c0.419717,0.294757 0.765744,0.540756 1.113983,0.78203c2.066111,1.433571 4.134233,2.864729 6.199541,4.298903c2.045,1.4202 4.08819,2.842411 6.13128,4.264924c1.922654,1.338368 3.841085,2.681863 5.76575,4.01611c1.82735,1.267092 3.662743,2.521718 5.487983,3.791524c0.20066,0.139537 0.337382,0.136119 0.537137,0c1.476598,-1.012246 2.966969,-2.004486 4.443768,-3.01633c3.65259,-2.503622 7.299248,-5.01589 10.950129,-7.521522c2.653514,-1.820715 5.30954,-3.637108 7.963657,-5.45712c0.548899,-0.376388 1.097697,-0.759712 1.672432,-1.158418l-7.943752,0c-3.891451,2.672715 -7.78059,5.349451 -11.674454,8.018547zm-25.099755,16.611729c-0.028149,0.069467 -0.04172,0.087361 -0.04172,0.105557c-0.000402,0.369753 -0.000503,0.739505 -0.000905,1.109258l0,2.212786c0.000503,0.662398 0.000905,1.324495 0.00372,1.986591c0.000201,0.035789 0.012667,0.076001 0.029657,0.115309c6.51752,4.504087 13.033934,9.007269 19.579804,13.530557c0.006132,-0.000603 0.012466,-0.003921 0.018699,-0.004926l3.983337,-2.765304c-7.885846,-5.44968 -15.72394,-10.865985 -23.57259,-16.289829zm39.114167,-13.471243c-4.894046,3.388193 -9.72325,6.73155 -14.571755,10.087875c0.072985,0.081531 0.106663,0.13642 0.15522,0.171003c1.230398,0.872508 2.460997,1.744915 3.698331,2.608275c0.029958,0.02091 0.081631,0.026842 0.133405,0.022519c3.513757,-2.432547 7.020677,-4.860268 10.550217,-7.303672c0.015884,-0.030059 0.025334,-0.064038 0.034583,-0.098118l0,-5.487882zm0.011058,13.682459c-1.653432,1.142634 -3.249159,2.245559 -4.865596,3.362659c1.28951,0.914731 2.538506,1.80071 3.785492,2.685181l1.080104,-0.74976l0,-5.29808z" fill={themeVars['--theme-topbar-category-text-color']} clipRule="evenodd" fillRule="evenodd" />
          </g>
          <rect id="svg_14" height="30" width="100%" y="140" x="0" strokeOpacity="null" strokeWidth="0" fill={themeVars['--theme-bordered-box-background-color']} />
          <rect id="svg_17" height="30" width="100%" y="190" x="0" strokeOpacity="null" strokeWidth="0" fill={themeVars['--theme-bordered-box-background-color']} />
          <rect id="svg_18" height="30" width="100%" y="240" x="0" strokeOpacity="null" strokeWidth="0" fill={themeVars['--theme-bordered-box-background-color']} />
          <rect id="svg_19" height="30" width="60%" y="300" x="20%" strokeWidth="0" stroke="null" fill={themeVars['--theme-button-primary-background-color']} />
          <line strokeWidth="2" strokeLinecap="null" strokeLinejoin="null" id="svg_20" y2="110" x2="100%" y1="110" x1="0" fill="none" />
        </g>
      </svg></div>);
  }
}
