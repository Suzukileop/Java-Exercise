package DSAJava.StructureDeControle;

public class Factorielle {
    public static void main(String[] args) {
        int nombre = 3;
        if (nombre == 1) {System.out.println("1! = 1"); System.exit(0);}
        if (nombre == 2) {System.out.println("2! = 2"); System.exit(0);}
            
        int fact = 1;
        int temp = nombre;
        while (temp != 0) {
            fact *= temp;
            temp--;
        }

        System.out.println( + nombre + "! = " + fact);
    }
}
