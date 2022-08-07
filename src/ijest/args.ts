import commandLineArgs from 'command-line-args';

const optionDefinitions = [
  // {
  //   name: 'actives',
  //   alias: 'a',
  //   type: String,
  //   multiple: true,
  //   defaultOption: true,
  // },
  { name: 'count', alias: 'c', type: Number },
  { name: 'ijest', alias: 'i', type: Boolean },
];

export default commandLineArgs(optionDefinitions);
