// Ref: https://codewithstyle.info/Deep-property-access-in-TypeScript/

// interface Customer {
//   name: string;
//   company?: {
//     name: string;
//     address?: {
//       city: string;
//     }
//   }
// }

export function get<
  T extends object,
  P1 extends keyof T
>(obj: T, prop1: P1): T[P1];

export function get<
  T extends object,
  P1 extends keyof T,
  P2 extends keyof T[P1]
>(obj: T, prop1: P1, prop2: P2): T[P1][P2];

export function get<
  T extends object,
  P1 extends keyof T,
  P2 extends keyof T[P1],
  P3 extends keyof T[P1][P2],
>(obj: T, prop1: P1, prop2: P2, prop3: P3): T[P1][P2][P3];

export function get<
  T extends object,
  P1 extends keyof T,
  P2 extends keyof T[P1],
  P3 extends keyof T[P1][P2],
  P4 extends keyof T[P1][P2][P3],
>(obj: T, prop1: P1, prop2: P2, prop3: P3, prop4: P4): T[P1][P2][P3][P4];

export function get<
  T extends object,
  P1 extends keyof T,
  P2 extends keyof T[P1],
  P3 extends keyof T[P1][P2],
  P4 extends keyof T[P1][P2][P3],
  P5 extends keyof T[P1][P2][P3][P4],
>(obj: T, prop1: P1, prop2: P2, prop3: P3, prop4: P4, prop5: P5): T[P1][P2][P3][P4][P5];

export function get(obj: any, ...props: any[]): any {
  return props.reduce((result, prop) => result && result[prop], obj);
}

// NOTE: For the above to work the nodes must all be non optional
interface Customer {
  name: string;
  company: {
    name: string;
    address: {
      city: string;
    }
  }
}

const customer: Customer = {
  name: 'Peter J Smith',
  company: {
    name: 'VIS',
    address: {
      city: 'Edinburgh'
    }
  }
}

const city = get(customer, 'company', 'address', 'city') /*?*/