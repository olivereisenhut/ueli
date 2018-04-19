let filename : string option = [%bs.node __filename]

module Filesystem = {
  let get_files = x => x + 1;
};