#!/usr/bin/env node
'use strict';
const fs=require('node:fs'),path=require('node:path'),{spawnSync}=require('node:child_process');
const root=path.resolve(__dirname,'..'),manifest=path.join(root,'rust','Cargo.toml'),release=path.join(root,'rust','target','release');
const libs={win32:'brightdesk_engine.dll',darwin:'libbrightdesk_engine.dylib',linux:'libbrightdesk_engine.so'};
function run(command,args){const r=spawnSync(command,args,{cwd:root,stdio:'inherit',shell:process.platform==='win32',env:process.env});if(r.error)throw r.error;if(r.status!==0)process.exit(r.status??1);}
if(!libs[process.platform]){console.error('Unsupported platform');process.exit(2);}
const out=path.join(root,'native');fs.mkdirSync(out,{recursive:true});const dest=path.join(out,'brightdesk_engine.node');
if(process.platform==='darwin'){const targets=['aarch64-apple-darwin','x86_64-apple-darwin'];run('rustup',['target','add',...targets]);const artifacts=targets.map(target=>{run('cargo',['build','--manifest-path',manifest,'--workspace','--release','--target',target]);const file=path.join(root,'rust','target',target,'release',libs.darwin);if(!fs.existsSync(file))throw new Error('Missing Rust target library: '+file);return file;});run('xcrun',['lipo','-create',...artifacts,'-output',dest]);}
else{run(process.platform==='win32'?'cargo.exe':'cargo',['build','--manifest-path',manifest,'--workspace','--release']);const file=path.join(release,libs[process.platform]);if(!fs.existsSync(file))throw new Error('Missing Rust library: '+file);fs.copyFileSync(file,dest);}
console.log('Built Brightdesk universal/native Node-API module:',dest);
