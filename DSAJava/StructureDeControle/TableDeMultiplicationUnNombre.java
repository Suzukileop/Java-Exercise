package DSAJava.StructureDeControle;
import  java.util.Scanner;

public class TableDeMultiplicationUnNombre {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.println("Entrez un nombre :");
        int nombre = scanner.nextInt();

        System.out.println("\nVoici la table de multiplication de " + nombre);
        for (int i = 0; i <= 10; i++) {
            System.out.println(nombre + " * " + i + " = " + (nombre * i) );
        }

        scanner.close();
    }
}
