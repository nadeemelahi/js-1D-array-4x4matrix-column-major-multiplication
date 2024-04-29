

/*
 * author: Nadeem Elahi
 * nadeem.elahi@gmail.com
 * nad@3deem.com
 * license: gpl v3
 */

//
// Row Major Multiplication
//
// 1D js array representing a 4x4 matrix as so:
//
//  --                --   --                --
// | m0   m1   m2   m3  | | n0   n1   n2   n3  |
// | m4   m5   m6   m7  | | n4   n5   n6   n7  |
// | m8   m9   m10  m11 | | n8   n9   n10  n11 |
// | m12  m13  m14  m15 | | n12  n13  n14  n15 |
//  --                --   --                --
//
// r0  = m0.n0  +  m4.n1  +  m8.n2  +  m12.n3
// r1  = m0.n4  +  m4.n5  +  m8.n6  +  m12.n7
// r2  = m0.n8  +  m4.n9  +  m8.n10 +  m12.n11
// r3  = m0.n12 +  m4.n13 +  m8.n14 +  m12.n15
//
// r4  = m1.n0  +  m5.n1  +  m9.n2  +  m13.n3
// r5  = m1.n4  +  m5.n5  +  m9.n6  +  m13.n7
// r6  = m1.n8  +  m5.n9  +  m9.n10 +  m13.n11
// r7  = m1.n12 +  m5.n13 +  m9.n14 +  m13.n15
//
// r8  = m2.n0  +  m6.n1  +  m10.n2  +  m14.n3
// r9  = m2.n4  +  m6.n5  +  m10.n6  +  m14.n7
// r10 = m2.n8  +  m6.n9  +  m10.n10 +  m14.n11
// r11 = m2.n12 +  m6.n13 +  m10.n14 +  m14.n15
//
// r12 = m3.n0  +  m7.n1  +  m11.n2  +  m15.n3
// r13 = m3.n4  +  m7.n5  +  m11.n6  +  m15.n7
// r14 = m3.n8  +  m7.n9  +  m11.n10 +  m15.n11
// r15 = m3.n12 +  m7.n13 +  m11.n14 +  m15.n15
//
//
//


function print4x4mat ( mat ) {
	var idx , limx = 16;

	for ( idx = 0 ; idx < limx ; idx += 4 ){

		console.log( mat[idx]
			+ " " + mat[idx + 1]
			+ " " + mat[idx + 2]
			+ " " + mat[idx + 3]
		);
	}
}





function rowMajor4x4matrixMultiplication( rmat , mmat , nmat ) {
	var idx , idy , idz , lim = 4 ;
	var rdex , mdex , ndex ;
	for ( idx = 0 ; idx < lim ; idx ++ ) {
		for ( idy = 0 ; idy < lim ; idy ++ ) {
			for ( idz = 0 ; idz < lim ; idz ++ ) {

				rdex = idy + idx * lim;
				ndex = idz + idx * lim;
				mdex = idy + idz * lim;

				//console.log(rdex,ndex,mdex)
				// 0 0 0
				// 0 1 4
				// 0 2 8
				// 0 3 12
				// 1 0 1
				// 1 1 5
				// 1 2 9
				// 1 3 13
				// 2 0 2
				// 2 1 6

				rmat[rdex] += mmat[mdex] * nmat[ndex];


			}
		}
	}
}

function transpose4x4matrix( mat ) {

	var org = new Float32Array(16); // original

	var idx , idy , lim = 16;
	// copy original
	for ( idx = 0 ; idx < lim ; idx ++ ) {
		org[idx] = mat[idx]
	}

	var idy , mdex , odex , lim = 4;
	for ( idx = 0 ; idx < lim ; idx ++ ) {
		for ( idy = 0 ; idy < lim ; idy ++ ) {

			//console.log( idx * lim + idy );
			// 012...15

			//console.log( idy * lim + idx );
			// 0 4 8 12 
			// 1 5 9 13
			// 2 6 10 14
			// 3 7 11 15

			odex = idx * lim + idy;
			mdex = idy * lim + idx;

			mat[mdex] = org[odex];


		}
	}

}

var mmat = new Float32Array(16);
var nmat = new Float32Array(16);
var rmat = new Float32Array(16);

var index , lim = 16;
for ( index = 0 ; index < lim ; index ++ ) {

	mmat[index] = index + 1;
	nmat[index] = index;
}


console.log("---");
print4x4mat(mmat);

transpose4x4matrix( mmat );

console.log("---");
print4x4mat(mmat);


console.log("---");
print4x4mat(nmat);

transpose4x4matrix( nmat );

console.log("---");
print4x4mat(nmat);


rowMajor4x4matrixMultiplication( rmat , mmat , nmat ) ;

console.log("---");
print4x4mat(rmat);




/*

for ( idx = 0 ; idx < lim ; idx ++ ) {
	for ( idy = 0 ; idy < lim ; idy ++ ) {
		for ( idz = 0 ; idz < lim ; idz ++ ) {
			// indices for r 
			//console.log(idy + idx * lim )
			// 0,0,0,0, 
			// 1,1,1,1, 
			// ... 15
			
			// indices for m
			// console.log(idz + idx * lim)
			//  0 ,  1 , 2  , 3    X 4
			//  4 ,  5 , 6  , 7    X 4
			//  8 ,  9 , 10 , 11   X 4
			// 12 , 13 , 14 , 15   X4


			// indices for n
			// console.log(idy + idz * lim); 
			// 0 , 4 , 8 , 12
			// 1 , 5 , 9 , 13
			// 2 , 6 , 10, 14
			// 3 , 7 , 11, 15   X4
			// ---------------
			// 0 , 4 , 8 , 12	
			// ...


		}
	}
}
*/



