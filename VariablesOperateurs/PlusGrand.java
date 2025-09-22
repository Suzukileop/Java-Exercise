package VariablesOperateurs;
import java.util.Scanner;


public class PlusGrand {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        // Entrer des 3 nombre 
        System.out.println("Entrer le premier nombre : ");
        int nombre1 = scanner.nextInt();

        System.out.println("Entrer le deuxieme nombre : ");
        int nombre2 = scanner.nextInt();

        System.out.println("Entrer le trisieme nombre : ");
        int nombre3 = scanner.nextInt();

        if ( nombre1 < nombre2 || nombre2 > nombre3){
            System.out.println(nombre2 + " est le plus grand nombre.");
        }else if (nombre1 < nombre2 || nombre2 < nombre3) {
            System.out.println(nombre3 + " est le plus grand nombre.");

        }else if (nombre1 > nombre2 || nombre1 > nombre3) {
            System.out.println(nombre1 + " est le plus grand nombre.");

        }else{
            System.out.println(nombre3 + " est le plus grand nombre.");

        }

        scanner.close();
    }
    
}
