package VariablesOperateurs;
import java.util.Scanner;

// Operateur bit a bit 
public class OperateurBitABit {

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.println("Entrez le premier nombre :");
        int nombre1 = scanner.nextInt();

        System.out.println("Entrez le deuxieme nombre :");
        int nombre2 = scanner.nextInt();

        // les deux nombres saisies 
        System.out.println("Premier nombre : " + nombre1);
        System.out.println("Deuxieme nombre : " + nombre2);
        
        // ET bit a bit 
        System.out.println("Et bit a bit 'a & b' : " + (nombre1 & nombre2));
        System.out.println("OU bit a bit 'a | b' : " + (nombre1 | nombre2));

        System.out.println("OU exclusif (XOR) 'a ^ b' : " + (nombre1 ^ nombre2));
        System.out.println("NON bit a bit 'complementaire de a ' : " + (~nombre1));
        System.out.println("Decalage a gauche '<<' : " + (nombre1 << 1));
        System.out.println("Decalage a droite 'signe = >>' : " + (nombre1 >> 1));
        System.out.println("Decalage a gauche 'non signe = >>>' : " + (nombre1 >>> 1));
    
        scanner.close();
    }
    
}
