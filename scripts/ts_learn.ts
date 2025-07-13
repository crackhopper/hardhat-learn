interface Vector3D {
  x: number;
  y: number;
  z: number;
}
function calculateLength(v:Vector3D){
    for(const axis of Object.keys(v)){
        const coord = (v as any)[axis];
    }
}

class C{
    foo:string;
    constructor(foo:string){
        this.foo = foo;
    }

}
const c = new C("instance of C");
const d:C = {foo:'object literal'}; // ok!?

function testC(cc:C){

}

testC({foo:'object literal'})
